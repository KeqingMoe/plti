import test from 'node:test';
import assert from 'node:assert/strict';

import { dimensions, dimensionOrder } from '../src/data/dimensions.ts';
import { languages } from '../src/data/languages.ts';
import { questions } from '../src/data/questions.ts';
import {
  ANSWER_VALUES,
  MAX_RAW_SCORE,
  MIN_RAW_SCORE,
  buildAnswersForRawScores,
  buildResultSnapshot,
  createEmptyProgress,
  decodeAnswerString,
  encodeAnswerString,
  parseProgress,
  scoreAnswers,
  serializeProgress
} from '../src/lib/plti.ts';
import type { AnswerIndex, DimensionId } from '../src/lib/types.ts';

test('question bank matches the planned structure', () => {
  assert.equal(questions.length, 60);
  assert.equal(new Set(questions.map((question) => question.id)).size, questions.length);

  for (const dimensionId of dimensionOrder) {
    const dimensionQuestions = questions.filter((question) => question.dimension === dimensionId);
    assert.equal(dimensionQuestions.length, 10);
    assert.equal(dimensionQuestions.filter((question) => question.polarity === -1).length, 5);
    assert.equal(dimensionQuestions.filter((question) => question.category === 'theory').length, 4);
    assert.equal(dimensionQuestions.filter((question) => question.category === 'engineering').length, 4);
    assert.equal(dimensionQuestions.filter((question) => question.category === 'team').length, 2);
  }
});

test('language pool contains 16 fully specified profiles', () => {
  assert.equal(languages.length, 16);
  assert.equal(new Set(languages.map((language) => language.id)).size, languages.length);

  for (const language of languages) {
    for (const dimensionId of dimensionOrder) {
      assert.ok(dimensionId in language.vector);
    }
  }
});

test('answer encoding and progress serialization round-trip correctly', () => {
  const completeAnswers = Array.from({ length: questions.length }, (_, index) => (index % 6) as AnswerIndex);
  const encoded = encodeAnswerString(completeAnswers);
  assert.equal(encoded.length, questions.length);
  assert.deepEqual(decodeAnswerString(encoded), completeAnswers);

  const inProgress = createEmptyProgress();
  inProgress[0] = 5;
  inProgress[12] = 2;
  const serialized = serializeProgress(inProgress);
  assert.equal(serialized.length, questions.length);
  assert.deepEqual(parseProgress(serialized), inProgress);
  assert.equal(decodeAnswerString('bad'), null);
});

test('zeroed answers produce centered raw and display scores', () => {
  const answers = Array.from({ length: questions.length }, () => 0 as AnswerIndex);
  const { rawScores, displayScores } = scoreAnswers(answers);

  for (const dimensionId of dimensionOrder) {
    assert.equal(rawScores[dimensionId], 0);
    assert.equal(displayScores[dimensionId], 0);
  }
});

test('buildAnswersForRawScores can synthesize exact raw scores at the boundaries', () => {
  const targets = Object.fromEntries(
    dimensionOrder.map((dimensionId, index) => [dimensionId, index % 2 === 0 ? MAX_RAW_SCORE : MIN_RAW_SCORE])
  ) as Record<DimensionId, number>;

  const answers = buildAnswersForRawScores(targets);
  const { rawScores } = scoreAnswers(answers);
  assert.deepEqual(rawScores, targets);
});

test('every language profile is reachable as the top recommendation', () => {
  for (const language of languages) {
    const targetRawScores = Object.fromEntries(
      dimensionOrder.map((dimensionId) => [dimensionId, language.vector[dimensionId] * 15])
    ) as Record<DimensionId, number>;

    const answers = buildAnswersForRawScores(targetRawScores);
    const snapshot = buildResultSnapshot(answers);

    assert.equal(snapshot.ranking[0].languageId, language.id, `expected ${language.name} to be the top result`);
    assert.deepEqual(snapshot.rawScores, targetRawScores);
  }
});

test('neutral profile ranks TypeScript first to keep ranking deterministic', () => {
  const snapshot = buildResultSnapshot(Array.from({ length: questions.length }, () => 0 as AnswerIndex));
  assert.equal(snapshot.ranking[0].languageId, 'typescript');
});

