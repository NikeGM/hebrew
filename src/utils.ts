import { WordClass, WordTense } from './types';

export const enum Field {
  face,
  numeral,
  gender,
  tense,
  pairing,
  infinitive,
  binyan,
  group,
  root,
  comment
}

const fields: Record<Field, WordClass[]> = {
  [Field.face]: [WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.PREPOSITION],
  [Field.numeral]: [WordClass.VERB, WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION],
  [Field.gender]: [WordClass.VERB, WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION],
  [Field.tense]: [WordClass.VERB],
  [Field.pairing]: [WordClass.NOUN],
  [Field.infinitive]: [WordClass.VERB],
  [Field.binyan]: [],
  [Field.group]: [],
  [Field.root]: [WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION],
  [Field.comment]: [WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION]
};

export const fieldExist = (
  field: Field,
  wordClass: WordClass,
  tense: WordTense,
  isInfinitive: boolean = false,
  formIndex = 0) => {
  switch (wordClass) {
    case WordClass.VERB:
      if (isInfinitive || formIndex === 0) {
        return !![Field.infinitive, Field.group, Field.binyan, Field.root, Field.comment].find(f => f === field);
      } else {
        if ((tense === WordTense.PAST || tense === WordTense.FUTURE) && field === Field.face) {
          return true;
        }
        return !!fields[field].find(c => c === wordClass);
      }
    default:
      return !!fields[field].find(c => c === wordClass);
  }
};

export const shuffle = <T>(arr: T[]): T[] => arr.sort(() => 0.5 - Math.random());