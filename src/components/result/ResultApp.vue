<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { siteCopy } from '../../data/copy.ts';
import { dimensions, dimensionOrder } from '../../data/dimensions.ts';
import {
  PLTI_VERSION,
  buildResultSnapshot,
  decodeAnswerString,
  getDimensionLean,
  getLanguageProfile,
  isCompleteProgress
} from '../../lib/plti.ts';
import { loadProgress, loadSavedResult, saveResult } from '../../lib/storage.ts';
import type { AnswerIndex, ResultSnapshot } from '../../lib/types.ts';

interface Props {
  base: string;
}

const { base } = defineProps<Props>();

const answers = ref<AnswerIndex[] | null>(null);
const snapshot = ref<ResultSnapshot | null>(null);
const shareMessage = ref('');

const topMatch = computed(() => snapshot.value?.ranking[0] ?? null);
const topLanguage = computed(() => (
  topMatch.value ? getLanguageProfile(topMatch.value.languageId) ?? null : null
));
const shareUrl = computed(() => {
  if (!snapshot.value) {
    return '';
  }

  const canonicalUrl = new URL(`${base}result`, window.location.origin);
  canonicalUrl.searchParams.set('v', PLTI_VERSION);
  canonicalUrl.searchParams.set('a', snapshot.value.answers);
  return canonicalUrl.toString();
});
const alternateMatches = computed(() => snapshot.value?.ranking.slice(1, 3) ?? []);
const ranking = computed(() => snapshot.value?.ranking ?? []);
const dominantDimensions = computed(() => {
  if (!snapshot.value) {
    return [];
  }

  return [...dimensionOrder]
    .sort((left, right) => Math.abs(snapshot.value!.displayScores[right]) - Math.abs(snapshot.value!.displayScores[left]))
    .slice(0, 2)
    .map((dimensionId) => {
      const dimension = dimensions.find((entry) => entry.id === dimensionId);
      const lean = getDimensionLean(dimensionId, snapshot.value!.displayScores[dimensionId]);
      return `${dimension?.name}：${lean.anchor}`;
    });
});

onMounted(() => {
  const resolvedAnswers = resolveAnswers();
  if (!resolvedAnswers) {
    return;
  }

  const nextSnapshot = buildResultSnapshot(resolvedAnswers);
  answers.value = resolvedAnswers;
  snapshot.value = nextSnapshot;
  saveResult(resolvedAnswers);

  const canonicalUrl = new URL(`${base}result`, window.location.origin);
  canonicalUrl.searchParams.set('v', PLTI_VERSION);
  canonicalUrl.searchParams.set('a', nextSnapshot.answers);
  window.history.replaceState({}, '', canonicalUrl.toString());
});

function resolveAnswers() {
  const currentUrl = new URL(window.location.href);
  const fromQuery = currentUrl.searchParams.get('v') === PLTI_VERSION
    ? decodeAnswerString(currentUrl.searchParams.get('a'))
    : null;

  if (fromQuery) {
    return fromQuery;
  }

  const fromSavedResult = loadSavedResult();
  if (fromSavedResult) {
    return fromSavedResult;
  }

  const fromProgress = loadProgress();
  if (fromProgress && isCompleteProgress(fromProgress)) {
    return fromProgress;
  }

  return null;
}

function getAlternateLanguage(languageId: string) {
  return getLanguageProfile(languageId) ?? null;
}

async function copyShareLink(event: Event) {
  const input = event.currentTarget instanceof HTMLButtonElement
    ? event.currentTarget.parentElement?.querySelector('input')
    : null;

  try {
    await navigator.clipboard.writeText(shareUrl.value);
    shareMessage.value = '结果链接已复制，可以直接发给别人。';
  } catch {
    if (input instanceof HTMLInputElement) {
      input.select();
    }
    shareMessage.value = '自动复制失败了，但链接已经选中，你可以手动复制。';
  }
}
</script>

<template>
  <section class="result-shell">
    <div class="section-heading">
      <p class="section-kicker">Result</p>
      <h1 class="page-title">你的语言画像会在这里展开。</h1>
      <p class="page-lede">{{ siteCopy.resultIntro }}</p>
    </div>

    <section v-if="!snapshot || !topMatch || !topLanguage" class="empty-card">
      <p class="overline">No Result Yet</p>
      <h2>这里还没有可展示的结果。</h2>
      <p>你还没完成测试，或者分享链接里的答案串无效。先去答题，PLTI 才能认真地把你映射到某门语言上。</p>
    </section>

    <section v-else class="result-hero">
      <article class="result-card result-card--hero">
        <header>
          <div>
            <p class="overline">Top Match</p>
            <h2 class="result-title">{{ topLanguage.personaTitle }} · {{ topLanguage.name }}</h2>
          </div>
          <span class="fit-badge">匹配度 {{ topMatch.fit }}%</span>
        </header>

        <p class="result-summary">{{ topLanguage.summary }}</p>

        <div>
          <p class="overline">Shareable Link</p>
          <div class="share-box">
            <input readonly type="text" :value="shareUrl" @focus="($event.target as HTMLInputElement).select()" />
            <button class="button" type="button" @click="copyShareLink">复制链接</button>
          </div>
          <p v-if="shareMessage" class="share-note">{{ shareMessage }}</p>
        </div>
      </article>

      <div class="result-grid">
        <section class="meter-stack">
          <article v-for="dimension in dimensions" :key="dimension.id" class="meter-card">
            <div class="meter-head">
              <div>
                <p class="overline">{{ dimension.name }}</p>
                <h3>{{ getDimensionLean(dimension.id, snapshot.displayScores[dimension.id]).title }}</h3>
              </div>
              <span class="score-badge">
                {{ snapshot.displayScores[dimension.id] > 0 ? '+' : '' }}{{ snapshot.displayScores[dimension.id] }}
              </span>
            </div>

            <div class="meter-track">
              <div
                class="meter-fill-left"
                :style="{ width: `${snapshot.displayScores[dimension.id] < 0 ? Math.abs(snapshot.displayScores[dimension.id]) / 2 : 0}%` }"
              ></div>
              <div
                class="meter-fill-right"
                :style="{ width: `${snapshot.displayScores[dimension.id] > 0 ? Math.abs(snapshot.displayScores[dimension.id]) / 2 : 0}%` }"
              ></div>
            </div>

            <div class="meter-labels">
              <span>{{ dimension.leftTitle }}</span>
              <span>{{ dimension.rightTitle }}</span>
            </div>
            <p>{{ getDimensionLean(dimension.id, snapshot.displayScores[dimension.id]).description }}</p>
          </article>
        </section>

        <div class="facts-and-alt">
          <div class="alt-grid">
            <article v-for="entry in alternateMatches" :key="entry.languageId" class="alt-card">
              <template v-if="getAlternateLanguage(entry.languageId)">
                <div class="tag-row">
                  <span class="score-badge">备选结果</span>
                  <span class="fit-badge">{{ entry.fit }}%</span>
                </div>
                <h3>
                  {{ getAlternateLanguage(entry.languageId)?.personaTitle }} · {{ getAlternateLanguage(entry.languageId)?.name }}
                </h3>
                <p>{{ getAlternateLanguage(entry.languageId)?.summary }}</p>
              </template>
            </article>
          </div>

          <div class="facts-grid">
            <article class="soft-card">
              <p class="overline">Why This Match</p>
              <h3>为什么会是这门语言</h3>
              <ul class="quote-list">
                <li v-for="item in topLanguage.whyFit" :key="item">{{ item }}</li>
              </ul>
            </article>

            <article class="soft-card">
              <p class="overline">One Gentle Warning</p>
              <h3>也许会卡住你的地方</h3>
              <p>{{ topLanguage.caveat }}</p>
            </article>

            <article class="soft-card">
              <p class="overline">Code Catchphrase</p>
              <h3>{{ topLanguage.catchphrase }}</h3>
              <p>这大概就是你在代码评审里最容易说出口的话。</p>
            </article>

            <article class="soft-card">
              <p class="overline">Blind Spot</p>
              <h3>{{ topLanguage.blindspot }}</h3>
              <p>每种语言气质都有代价。你的代价，通常出现在这类场景里。</p>
            </article>

            <article class="soft-card">
              <p class="overline">Ideal Team</p>
              <h3>{{ topLanguage.idealTeam }}</h3>
              <p>你最舒服的协作环境，大概率会长成这样。</p>
            </article>

            <article class="soft-card">
              <p class="overline">Strongest Axes</p>
              <h3>{{ dominantDimensions.join(' · ') }}</h3>
              <p>这是你这次画像里最明显的两条轴线，也最影响最终匹配结果。</p>
            </article>
          </div>
        </div>
      </div>

      <section class="all-languages">
        <p class="overline">All Candidates</p>
        <h2>所有候选语言匹配度</h2>
        <div class="language-bar-list">
          <div v-for="(entry, index) in ranking" :key="entry.languageId" class="language-bar-row">
            <template v-if="getAlternateLanguage(entry.languageId)">
              <div class="language-bar-label">
                <span class="language-bar-rank">#{{ index + 1 }}</span>
                <span class="language-bar-name">{{ getAlternateLanguage(entry.languageId)?.name }}</span>
                <span class="language-bar-fit">{{ entry.fit }}%</span>
              </div>
              <div class="language-bar-track">
                <div class="language-bar-fill" :style="{ width: `${entry.fit}%` }"></div>
              </div>
            </template>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<style>
.share-note {
  border-radius: var(--radius-md);
  color: var(--ink-soft);
  padding: 14px 16px;
}

.result-hero {
  display: grid;
  gap: 18px;
}

.result-grid,
.facts-grid,
.facts-and-alt,
.alt-grid {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}

.result-grid,
.facts-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.result-card h2,
.result-card h3,
.facts-grid h3,
.meter-card h3,
.empty-card h2 {
  font-family: var(--display-font);
  font-size: 1.45rem;
  margin: 0;
}

.result-card p,
.empty-card p,
.soft-card p,
.meter-card p {
  color: var(--ink-soft);
  margin: 10px 0 0;
}

.result-card--hero {
  background: linear-gradient(145deg, rgba(255, 250, 243, 0.94), rgba(241, 228, 208, 0.9));
  display: grid;
  gap: 18px;
}

.result-card--hero header {
  align-items: start;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: space-between;
}

.result-summary {
  color: var(--ink-soft);
  font-size: 1.08rem;
  margin: 0;
}

.share-box {
  align-items: center;
  display: flex;
  gap: 10px;
}

.share-box input {
  background: rgba(255, 250, 243, 0.9);
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  flex: 1;
  min-width: 0;
  padding: 12px 16px;
}

.alt-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.alt-card {
  background: rgba(255, 250, 243, 0.8);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.alt-card h3 {
  margin-bottom: 8px;
}

.alt-card p {
  margin: 0;
}

.meter-stack {
  display: grid;
  gap: 14px;
}

.meter-card {
  display: grid;
  gap: 12px;
}

.meter-head {
  display: flex;
  gap: 14px;
  justify-content: space-between;
}

.meter-track {
  background: linear-gradient(90deg, rgba(32, 77, 89, 0.08) 0%, rgba(255, 250, 243, 0.76) 50%, rgba(197, 90, 52, 0.08) 100%);
  border-radius: 999px;
  height: 14px;
  overflow: hidden;
  position: relative;
}

.meter-track::after {
  background: rgba(76, 67, 61, 0.22);
  content: '';
  height: 100%;
  left: 50%;
  position: absolute;
  top: 0;
  width: 1px;
}

.meter-fill-left,
.meter-fill-right {
  border-radius: 999px;
  height: 100%;
  position: absolute;
  top: 0;
}

.meter-fill-left {
  background: linear-gradient(90deg, rgba(32, 77, 89, 0.78), rgba(32, 77, 89, 0.3));
  right: 50%;
}

.meter-fill-right {
  background: linear-gradient(90deg, rgba(197, 90, 52, 0.38), rgba(197, 90, 52, 0.9));
  left: 50%;
}

.meter-labels {
  color: var(--muted);
  display: flex;
  font-size: 0.9rem;
  justify-content: space-between;
}

.quote-list {
  display: grid;
  gap: 10px;
  margin: 0;
  margin-top: 12px;
  padding-left: 1.2rem;
}

.quote-list li {
  color: var(--ink-soft);
}

.empty-card {
  margin: 40px auto 0;
  max-width: 720px;
}

.all-languages {
  margin-top: 48px;
}

.all-languages h2 {
  margin: 4px 0 24px;
  font-family: var(--display-font);
  font-size: clamp(1.3rem, 2.8vw, 1.6rem);
  font-weight: 600;
}

.language-bar-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.language-bar-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.language-bar-label {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--body-font);
  font-size: 0.95rem;
  color: var(--ink);
}

.language-bar-rank {
  font-size: 0.8rem;
  color: var(--muted);
  min-width: 28px;
}

.language-bar-name {
  font-weight: 600;
  flex: 1;
}

.language-bar-fit {
  font-variant-numeric: tabular-nums;
  color: var(--ink-soft);
  font-size: 0.85rem;
}

.language-bar-track {
  height: 8px;
  border-radius: 4px;
  background: var(--line);
  overflow: hidden;
}

.language-bar-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--accent), var(--teal));
  transition: width 0.6s ease;
}

@media (max-width: 900px) {
  .result-grid,
  .facts-grid {
    grid-template-columns: 1fr;
  }

  .alt-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .share-box {
    align-items: stretch;
    flex-direction: column;
  }

  .language-bar-list {
    gap: 12px;
  }

  .language-bar-label {
    flex-wrap: wrap;
  }
}
</style>
