import { Word, WordClass } from './types';

export const enum Field {
  face,
  numeral,
  gender,
  tense,
  pairing,
  infinitive,
  binyan,
  group
}

const fields: Record<Field, WordClass[]> = {
  [Field.face]: [WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.PREPOSITION],
  [Field.numeral]: [WordClass.VERB, WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION],
  [Field.gender]: [WordClass.VERB, WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION],
  [Field.tense]: [WordClass.VERB],
  [Field.pairing]: [WordClass.NOUN],
  [Field.infinitive]: [WordClass.VERB],
  [Field.binyan]: [WordClass.VERB],
  [Field.group]: [WordClass.VERB]
};

export const fieldExist = (field: Field, wordClass: WordClass, isInfinitive: boolean = false) => {
  switch (wordClass) {
    case WordClass.VERB:
      if (isInfinitive) {
        return !![Field.infinitive, Field.group, Field.binyan].find(f => f === field);
      } else {
        return !!fields[field].find(c => c === wordClass);
      }
    default:
      return !!fields[field].find(c => c === wordClass);
  }
};


