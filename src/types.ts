import { Mode } from './components/startScreen/startScreen';

export enum WordClass {
  VERB = 'verb',
  NOUN = 'noun',
  ADJECTIVE = 'adjective',
  PRONOUN = 'pronoun',
  NUMERALS = 'numerals',
  ADVERB = 'adverb',
  PREPOSITION = 'preposition',
  CONJUNCTION = 'conjunction',
  PARTICLE = 'particle'
}

export enum WordNumber {
  PLURAL = 'plural',
  SINGLE = 'single'
}

export enum WordGender {
  FEMALE = 'female',
  MALE = 'male'
}

export enum WordFace {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third'
}

export enum WordTense {
  PRESENT = 'present',
  PAST = 'past',
  FUTURE = 'future',
  IMPERATIVE = 'imperative',

}

export enum WordBinyan {
  PAAL = 'paal',
  PIEL = 'piel',
  HIFIL = 'hifil',
  HITPAEL = 'hitpael',
  NIFAL = 'nifal'
}

export enum WordGroup {
  PAAL_SIMPLE = 'paal-simple',
  PAAL_OT = 'paal-ot',
  PAAL_2_LETTERS = 'paal-2-letters',
  PIEL_EAE = 'piel-eae',
  PIEL_EAOT = 'piel-eaot',
  PIEL_4_LETTERS = 'piel-4-letters',
  HIFIL_SIMPLE = 'hifil-simple',
  HITPAEL_SIMPLE = 'hitpael-simple',
  NIFAL_SIMPLE = 'nifal-simple',
}

export enum WordStatus {
  LEARNED = 'learned',
  IN_PROGRESS = 'in_progress',
  REMEMBERED = 'remembered',
  DIFFICULT = 'difficult'
}

export interface WordStats {
  plusesFront: number;
  plusesBack: number;
  minusesFront: number;
  minusesBack: number;
  status: WordStatus;
}

export enum WordTags {
  None = 'none',
  EXCLUSION = 'exclusion'
}

export interface Word {
  wordId?: number;
  word: string;
  translation: string;
  pronunciation: string;
  class: WordClass;
  comment?: string;
  formIndex: number;
  root?: string;
  number?: WordNumber;
  gender?: WordGender;
  face?: WordFace;
  tense?: WordTense;
  stats?: WordStats;
  binyan?: WordBinyan;
  group?: WordGroup;
  isInfinitive?: boolean;
  isPairing?: boolean;
  forms?: Word[];
  formId?: number;
  tags: (WordTags | WordClass | WordGroup | string)[];
}

export enum Language {
  RUSSIAN,
  HEBREW
}

export interface EditWordsFilters {
  like: string;
  language: Language;
  limit: number;
  formIndexes: number[];
}

export interface CardsFilters {
  count: number;
  classes: WordClass[];
  mode: Mode;
}
