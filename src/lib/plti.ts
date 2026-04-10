import { dimensions, dimensionOrder } from '../data/dimensions.ts';
import { languages } from '../data/languages.ts';
import { questionPages, questions } from '../data/questions.ts';
import type { AnswerIndex, AnswerValue, DimensionId, LanguageProfile, RankedLanguage, ResultSnapshot } from './types.ts';

export const PLTI_VERSION = 'v1' as const;
export const ANSWER_VALUES: AnswerValue[] = [-3, -2, -1, 1, 2, 3];
export const EMPTY_PROGRESS_TOKEN = 'x';
export const QUIZ_PAGE_SIZE = 10;
export const TOTAL_QUESTIONS = questions.length;
export const MAX_RAW_SCORE = 30;
export const MIN_RAW_SCORE = -30;
export { questionPages };

type UserVector = Record<DimensionId, number>;

export function isAnswerIndex(value: unknown): value is AnswerIndex {
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 5;
}

export function answerIndexToValue(index: AnswerIndex): AnswerValue {
  return ANSWER_VALUES[index];
}

export function createEmptyProgress(): Array<AnswerIndex | null> {
  return Array.from({ length: TOTAL_QUESTIONS }, () => null);
}

export function encodeAnswerString(answers: AnswerIndex[]): string {
  if (answers.length !== TOTAL_QUESTIONS) {
    throw new Error(`Expected ${TOTAL_QUESTIONS} answers, received ${answers.length}.`);
  }

  if (!answers.every(isAnswerIndex)) {
    throw new Error('Answer string can only encode complete answers.');
  }

  return answers.join('');
}

export function decodeAnswerString(serialized: string | null | undefined): AnswerIndex[] | null {
  if (!serialized || serialized.length !== TOTAL_QUESTIONS) {
    return null;
  }

  const decoded = Array.from(serialized, (char) => Number(char));
  return decoded.every(isAnswerIndex) ? decoded : null;
}

export function serializeProgress(answers: Array<AnswerIndex | null>): string {
  if (answers.length !== TOTAL_QUESTIONS) {
    throw new Error(`Expected ${TOTAL_QUESTIONS} progress slots, received ${answers.length}.`);
  }

  return answers.map((answer) => (answer === null ? EMPTY_PROGRESS_TOKEN : String(answer))).join('');
}

export function parseProgress(serialized: string | null | undefined): Array<AnswerIndex | null> | null {
  if (!serialized || serialized.length !== TOTAL_QUESTIONS) {
    return null;
  }

  const parsed = Array.from(serialized, (char) => {
    if (char === EMPTY_PROGRESS_TOKEN) {
      return null;
    }

    const value = Number(char);
    return isAnswerIndex(value) ? value : Symbol.for('invalid-progress');
  });

  return parsed.some((entry) => entry === Symbol.for('invalid-progress'))
    ? null
    : (parsed as Array<AnswerIndex | null>);
}

export function isCompleteProgress(answers: Array<AnswerIndex | null>): answers is AnswerIndex[] {
  return answers.length === TOTAL_QUESTIONS && answers.every(isAnswerIndex);
}

export function getAnsweredCount(answers: Array<AnswerIndex | null>): number {
  return answers.filter(isAnswerIndex).length;
}

export function getFirstIncompletePage(answers: Array<AnswerIndex | null>): number {
  const firstIncompleteIndex = answers.findIndex((answer) => !isAnswerIndex(answer));

  if (firstIncompleteIndex === -1) {
    return questions.length / QUIZ_PAGE_SIZE - 1;
  }

  return Math.floor(firstIncompleteIndex / QUIZ_PAGE_SIZE);
}

function createDimensionRecord(initialValue: number): Record<DimensionId, number> {
  return Object.fromEntries(dimensionOrder.map((dimensionId) => [dimensionId, initialValue])) as Record<DimensionId, number>;
}

function buildUserVector(rawScores: Record<DimensionId, number>): UserVector {
  return Object.fromEntries(
    dimensionOrder.map((dimensionId) => [dimensionId, rawScores[dimensionId] / 15])
  ) as UserVector;
}

export function scoreAnswers(answers: AnswerIndex[]) {
  const rawScores = createDimensionRecord(0);

  questions.forEach((question, index) => {
    rawScores[question.dimension] += answerIndexToValue(answers[index]) * question.polarity;
  });

  const displayScores = Object.fromEntries(
    dimensionOrder.map((dimensionId) => [dimensionId, Math.round((rawScores[dimensionId] / MAX_RAW_SCORE) * 100)])
  ) as Record<DimensionId, number>;

  return {
    rawScores,
    displayScores,
    userVector: buildUserVector(rawScores)
  };
}

function compareRankedLanguages(a: RankedLanguage & { distance: number; maxDiff: number }, b: RankedLanguage & { distance: number; maxDiff: number }) {
  if (a.fit !== b.fit) {
    return b.fit - a.fit;
  }

  if (a.maxDiff !== b.maxDiff) {
    return a.maxDiff - b.maxDiff;
  }

  return languages.findIndex((language) => language.id === a.languageId) - languages.findIndex((language) => language.id === b.languageId);
}

export function rankLanguages(rawScores: Record<DimensionId, number>): RankedLanguage[] {
  const userVector = buildUserVector(rawScores);

  return languages
    .map((language) => {
      const deltas = dimensionOrder.map((dimensionId) => Math.abs(userVector[dimensionId] - language.vector[dimensionId]));
      const distance = deltas.reduce((sum, delta) => sum + delta, 0);
      const maxDiff = Math.max(...deltas);

      return {
        languageId: language.id,
        fit: Math.round((1 - distance / 24) * 100),
        distance,
        maxDiff
      };
    })
    .sort(compareRankedLanguages)
    .map(({ languageId, fit }) => ({ languageId, fit }));
}

export function buildResultSnapshot(answers: AnswerIndex[]): ResultSnapshot {
  const { rawScores, displayScores } = scoreAnswers(answers);

  return {
    version: PLTI_VERSION,
    answers: encodeAnswerString(answers),
    rawScores,
    displayScores,
    ranking: rankLanguages(rawScores)
  };
}

export function getLanguageProfile(languageId: string): LanguageProfile | undefined {
  return languages.find((language) => language.id === languageId);
}

export function getDimensionById(dimensionId: DimensionId) {
  return dimensions.find((dimension) => dimension.id === dimensionId);
}

export function getDimensionLean(dimensionId: DimensionId, displayScore: number) {
  const dimension = getDimensionById(dimensionId);

  if (!dimension) {
    throw new Error(`Unknown dimension: ${dimensionId}`);
  }

  if (displayScore === 0) {
    return {
      title: '居中摇摆',
      anchor: '中间地带',
      description: '你在这条轴上两边都能接受，更看具体问题而不是先验立场。'
    };
  }

  const towardRight = displayScore > 0;
  const magnitude = Math.abs(displayScore);
  const intensity = magnitude >= 70 ? '强烈' : magnitude >= 35 ? '明显' : '轻微';

  return {
    title: `${intensity}偏向${towardRight ? dimension.rightTitle : dimension.leftTitle}`,
    anchor: towardRight ? dimension.rightTitle : dimension.leftTitle,
    description: towardRight ? dimension.rightDescription : dimension.leftDescription
  };
}

const dimensionQuestionIndexes = Object.fromEntries(
  dimensionOrder.map((dimensionId) => [
    dimensionId,
    questions.flatMap((question, index) => (question.dimension === dimensionId ? [index] : []))
  ])
) as Record<DimensionId, number[]>;

function solveDimensionAnswers(polarities: Array<1 | -1>, target: number): AnswerIndex[] | null {
  const memo = new Map<string, AnswerIndex[] | null>();

  function search(position: number, remaining: number): AnswerIndex[] | null {
    const key = `${position}:${remaining}`;
    if (memo.has(key)) {
      return memo.get(key) ?? null;
    }

    if (position === polarities.length) {
      return remaining === 0 ? [] : null;
    }

    for (let optionIndex = 0; optionIndex < ANSWER_VALUES.length; optionIndex += 1) {
      const contribution = ANSWER_VALUES[optionIndex] * polarities[position];
      const rest = search(position + 1, remaining - contribution);
      if (rest) {
        const result = [optionIndex as AnswerIndex, ...rest];
        memo.set(key, result);
        return result;
      }
    }

    memo.set(key, null);
    return null;
  }

  return search(0, target);
}

export function buildAnswersForRawScores(targets: Record<DimensionId, number>): AnswerIndex[] {
  const answers = createEmptyProgress();

  for (const dimensionId of dimensionOrder) {
    const target = targets[dimensionId];

    if (!Number.isInteger(target) || target < MIN_RAW_SCORE || target > MAX_RAW_SCORE) {
      throw new Error(`Target raw score for ${dimensionId} must be an integer between ${MIN_RAW_SCORE} and ${MAX_RAW_SCORE}.`);
    }

    const indexes = dimensionQuestionIndexes[dimensionId];
    const solution = solveDimensionAnswers(
      indexes.map((index) => questions[index].polarity),
      target
    );

    if (!solution) {
      throw new Error(`Unable to synthesize answers for ${dimensionId} with target ${target}.`);
    }

    indexes.forEach((questionIndex, position) => {
      answers[questionIndex] = solution[position];
    });
  }

  if (!isCompleteProgress(answers)) {
    throw new Error('Failed to synthesize a complete answer set.');
  }

  return answers;
}
