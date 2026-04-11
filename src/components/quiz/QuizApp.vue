<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { siteCopy } from '../../data/copy.ts';
import { dimensions } from '../../data/dimensions.ts';
import {
  PLTI_VERSION,
  QUIZ_PAGE_SIZE,
  TOTAL_QUESTIONS,
  createEmptyProgress,
  encodeAnswerString,
  getAnsweredCount,
  getFirstIncompletePage,
  isAnswerIndex,
  isCompleteProgress,
  questionPages
} from '../../lib/plti.ts';
import { clearProgress, clearSavedResult, loadProgress, loadSavedResult, saveProgress, saveResult } from '../../lib/storage.ts';

interface Props {
  base: string;
}

const { base } = defineProps<Props>();

const dimensionById = new Map(dimensions.map((dimension) => [dimension.id, dimension]));
const answers = ref(createEmptyProgress());
const currentPageIndex = ref(0);
const statusMessage = ref('');
const statusTone = ref<'info' | 'warning'>('info');
const hasSavedResult = ref(false);

const restoreMessage = computed(() => {
  const answered = getAnsweredCount(answers.value);
  if (answered === 0 && !hasSavedResult.value) {
    return '';
  }

  const fragments: string[] = [];
  if (answered > 0) {
    fragments.push(`已恢复本地进度：${answered} / ${TOTAL_QUESTIONS} 题。`);
  }
  if (hasSavedResult.value) {
    fragments.push('如果你上次已经做完，也可以直接去结果页查看。');
  }

  return fragments.join(' ');
});

const nextButtonText = computed(() => (
  currentPageIndex.value === questionPages.length - 1 ? '生成结果' : '下一页'
));

onMounted(() => {
  let nextAnswers = loadProgress() ?? createEmptyProgress();
  const url = new URL(window.location.href);

  if (url.searchParams.get('restart') === '1') {
    nextAnswers = createEmptyProgress();
    clearProgress();
    clearSavedResult();
    url.searchParams.delete('restart');
    window.history.replaceState({}, '', url.toString());
  }

  answers.value = nextAnswers;
  hasSavedResult.value = Boolean(loadSavedResult());
  currentPageIndex.value = Math.max(0, Math.min(questionPages.length - 1, getFirstIncompletePage(nextAnswers)));
});

function setStatus(message = '', tone: 'info' | 'warning' = 'info') {
  statusMessage.value = message;
  statusTone.value = tone;
}

function getOverallIndex(pageIndex: number, questionIndex: number) {
  return pageIndex * QUIZ_PAGE_SIZE + questionIndex;
}

function pageIsComplete(pageIndex: number) {
  const start = pageIndex * QUIZ_PAGE_SIZE;
  const end = start + QUIZ_PAGE_SIZE;
  return answers.value.slice(start, end).every(isAnswerIndex);
}

function updateAnswer(questionIndex: number, answerIndex: number) {
  if (!Number.isInteger(questionIndex) || !isAnswerIndex(answerIndex)) {
    return;
  }

  answers.value[questionIndex] = answerIndex;
  saveProgress(answers.value);
  setStatus('');
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goPrevPage() {
  currentPageIndex.value = Math.max(0, currentPageIndex.value - 1);
  setStatus('');
  scrollToTop();
}

function goToResult() {
  if (!isCompleteProgress(answers.value)) {
    setStatus('还有题目没有完成，先把所有页答完再生成结果。', 'warning');
    return;
  }

  saveProgress(answers.value);
  saveResult(answers.value);

  const resultUrl = new URL(`${base}result`, window.location.origin);
  resultUrl.searchParams.set('v', PLTI_VERSION);
  resultUrl.searchParams.set('a', encodeAnswerString(answers.value));
  window.location.assign(resultUrl.toString());
}

function goNextPage() {
  if (!pageIsComplete(currentPageIndex.value)) {
    setStatus('这一页还没答完。PLTI 不允许带着空题翻页。', 'warning');
    return;
  }

  if (currentPageIndex.value === questionPages.length - 1) {
    goToResult();
    return;
  }

  currentPageIndex.value += 1;
  setStatus('');
  scrollToTop();
}

function resetQuiz() {
  const shouldReset = window.confirm('这会清空当前答题进度和上一次结果。确定要重新开始吗？');
  if (!shouldReset) {
    return;
  }

  answers.value = createEmptyProgress();
  currentPageIndex.value = 0;
  hasSavedResult.value = false;
  clearProgress();
  clearSavedResult();
  setStatus('进度已清空，可以重新答题了。');
}

function isChecked(questionIndex: number, answerIndex: number) {
  return answers.value[questionIndex] === answerIndex;
}
</script>

<template>
  <section class="quiz-shell">
    <div class="section-heading">
      <p class="quiz-kicker">Quiz</p>
      <h1 class="page-title">60 道题，做出一份像样的语言画像。</h1>
      <p class="page-lede">每题都没有中立选项。你需要在两种倾向之间做出轻微到强烈的偏向选择。答题进度会自动保存在本地，刷新页面也不会丢。</p>
    </div>

    <section class="paper-card" style="padding: 24px;">
      <p v-if="restoreMessage" class="restore-note">{{ restoreMessage }}</p>
      <p v-if="statusMessage" class="status-note" :class="{ 'is-warning': statusTone === 'warning' }">{{ statusMessage }}</p>

      <form novalidate>
        <div class="quiz-page-list">
          <section
            v-for="(page, pageIndex) in questionPages"
            :key="pageIndex"
            class="quiz-page"
            :class="{ 'is-active': pageIndex === currentPageIndex }"
          >
            <article
              v-for="(question, questionIndex) in page"
              :key="question.id"
              class="question-card"
            >
              <header>
                <div>
                  <p class="question-index">
                    第 {{ getOverallIndex(pageIndex, questionIndex) + 1 }} 题 · {{ dimensionById.get(question.dimension)?.name }}
                  </p>
                  <h3>{{ question.prompt }}</h3>
                </div>
              </header>

              <div class="contrast-row">
                <div class="contrast-side">
                  <strong>左侧倾向</strong>
                  <p>{{ question.leftLabel }}</p>
                </div>
                <div class="contrast-separator">vs.</div>
                <div class="contrast-side">
                  <strong>右侧倾向</strong>
                  <p>{{ question.rightLabel }}</p>
                </div>
              </div>

              <div
                class="choice-grid"
                role="radiogroup"
                :aria-label="`第 ${getOverallIndex(pageIndex, questionIndex) + 1} 题作答`"
              >
                <label
                  v-for="(label, answerIndex) in siteCopy.answerLabels"
                  :key="`${question.id}-${answerIndex}`"
                  class="choice-option"
                  :for="`${question.id}-${answerIndex}`"
                >
                  <input
                    :id="`${question.id}-${answerIndex}`"
                    :checked="isChecked(getOverallIndex(pageIndex, questionIndex), answerIndex)"
                    :name="question.id"
                    type="radio"
                    :value="answerIndex"
                    @change="updateAnswer(getOverallIndex(pageIndex, questionIndex), answerIndex)"
                  />
                  <span>{{ label }}</span>
                </label>
              </div>
            </article>
          </section>
        </div>

        <div class="quiz-footer">
          <div class="page-pills">
            <span
              v-for="(_, pageIndex) in questionPages"
              :key="pageIndex"
              class="page-pill"
              :class="{ 'is-active': pageIndex === currentPageIndex }"
            >
              第 {{ pageIndex + 1 }} 页
            </span>
          </div>

          <div class="quiz-actions">
            <button class="button-ghost" type="button" @click="resetQuiz">清空重做</button>
            <button class="button-secondary" type="button" :disabled="currentPageIndex === 0" @click="goPrevPage">上一页</button>
            <button class="button" type="button" @click="goNextPage">{{ nextButtonText }}</button>
          </div>
        </div>
      </form>
    </section>
  </section>
</template>
