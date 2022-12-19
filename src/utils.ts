import { Word, WordClass } from './types';

export const enum Field {
  face,
  numeral,
  gender,
  tense,
  pairing,
  infinitive
}

const fields: Record<Field, WordClass[]> = {
  [Field.face]: [WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.PREPOSITION],
  [Field.numeral]: [WordClass.VERB, WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION],
  [Field.gender]: [WordClass.VERB, WordClass.NOUN, WordClass.ADJECTIVE, WordClass.PRONOUN, WordClass.NUMERALS, WordClass.PREPOSITION],
  [Field.tense]: [WordClass.VERB],
  [Field.pairing]: [WordClass.NOUN],
  [Field.infinitive]: [WordClass.VERB]
};

export const fieldExist = (field: Field, wordClass: WordClass, isInfinitive: boolean = false) => {
  switch (wordClass) {
    case WordClass.VERB:
      if (isInfinitive) {
        return field === Field.infinitive;
      } else {
        return !!fields[field].find(c => c === wordClass);
      }
    default:
      return !!fields[field].find(c => c === wordClass);
  }
};


