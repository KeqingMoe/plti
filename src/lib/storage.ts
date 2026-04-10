import { decodeAnswerString, encodeAnswerString, parseProgress, PLTI_VERSION, serializeProgress } from './plti.ts';
import type { AnswerIndex } from './types.ts';

const progressKey = `plti:${PLTI_VERSION}:progress`;
const resultKey = `plti:${PLTI_VERSION}:result`;

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStorage(key: string): string | null {
  if (!canUseStorage()) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string): void {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore unavailable storage and continue without persistence.
  }
}

function removeStorage(key: string): void {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore unavailable storage and continue without persistence.
  }
}

export function loadProgress(): Array<AnswerIndex | null> | null {
  return parseProgress(readStorage(progressKey));
}

export function saveProgress(answers: Array<AnswerIndex | null>): void {
  writeStorage(progressKey, serializeProgress(answers));
}

export function clearProgress(): void {
  removeStorage(progressKey);
}

export function loadSavedResult(): AnswerIndex[] | null {
  return decodeAnswerString(readStorage(resultKey));
}

export function saveResult(answers: AnswerIndex[]): void {
  writeStorage(resultKey, encodeAnswerString(answers));
}

export function clearSavedResult(): void {
  removeStorage(resultKey);
}
