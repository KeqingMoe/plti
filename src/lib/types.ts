export type DimensionId =
  | 'type-discipline'
  | 'abstraction'
  | 'effects'
  | 'control'
  | 'engineering'
  | 'exploration';

export type AnswerValue = -3 | -2 | -1 | 1 | 2 | 3;

export type AnswerIndex = 0 | 1 | 2 | 3 | 4 | 5;

export type QuestionCategory = 'theory' | 'engineering' | 'team';

export type Question = {
  id: string;
  dimension: DimensionId;
  prompt: string;
  leftLabel: string;
  rightLabel: string;
  polarity: 1 | -1;
  category: QuestionCategory;
};

export type DimensionDefinition = {
  id: DimensionId;
  name: string;
  shortName: string;
  leftTitle: string;
  rightTitle: string;
  summary: string;
  leftDescription: string;
  rightDescription: string;
  methodNote: string;
};

export type LanguageProfile = {
  id: string;
  name: string;
  personaTitle: string;
  vector: Record<DimensionId, -2 | -1 | 0 | 1 | 2>;
  summary: string;
  whyFit: string[];
  caveat: string;
  catchphrase: string;
  blindspot: string;
  idealTeam: string;
};

export type RankedLanguage = {
  languageId: string;
  fit: number;
};

export type ResultSnapshot = {
  version: 'v1';
  answers: string;
  rawScores: Record<DimensionId, number>;
  displayScores: Record<DimensionId, number>;
  ranking: RankedLanguage[];
};

