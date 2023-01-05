import axios from 'axios';
import { CardsFilters, EditWordsFilters, Language, Word, WordClass, WordGender, WordNumber, WordTense } from './types';
import { Field, fieldExist } from './utils';

export class Api {
  private url = process.env.REACT_APP_API_URL;

  // private url = 'http://192.168.1.16:9999/api';

  constructor() {
  }

  public addWordWithForms(words: Word[]) {
    return axios.post(`${api.url}/words/edit/save`, words.map(this.convertWord));
  }

  public updateWordWithForms(words: Word[]) {
    return axios.post(`${api.url}/words/edit/update`, words.map(this.convertWord));
  }

  public async searchWords(value: string, language: Language): Promise<Word[]> {
    const filters: EditWordsFilters = {
      like: value,
      language,
      limit: 5,
      formIndexes: [0]
    };
    const result = await axios.post(`${api.url}/words/edit/search`, filters);
    return result.data;
  }

  public async getWordsForCards(filters: CardsFilters): Promise<Word[]> {
    const result = await axios.post(`${api.url}/words/cards/search`, filters);
    console.log(result.data)
    return result.data;
  }

  public async getWordWithForms(wordId: number): Promise<Word[]> {
    const result = await axios.post(`${api.url}/words/edit/get-word`, { wordId, withForms: true });
    return result.data;
  }

  public async saveStats(wordId: number, isCorrect: boolean) {
    const result = await axios.post(`${api.url}/words/cards/save-stats`, { wordId, isCorrect });
    return result.data;
  }

  private convertWord(word: Word) {
    const isInfinitive = word.class === WordClass.VERB && word.formIndex === 0;

    return ({
      wordId: word.wordId || undefined,
      word: word.word,
      translation: word.translation,
      pronunciation: word.pronunciation,
      class: word.class,
      comment: word.comment,
      formIndex: word.formIndex,
      number: fieldExist(Field.numeral, word.class, isInfinitive) ? WordNumber.SINGLE : null,
      gender: fieldExist(Field.gender, word.class, isInfinitive) ? WordGender.MALE : null,
      root: word.root,
      tense: fieldExist(Field.tense, word.class, isInfinitive) ? WordTense.PRESENT : null,
      isPairing: word.class === WordClass.NOUN ? false : null,
      isInfinitive: word.class === WordClass.VERB ? isInfinitive : null
    });
  };
}

export const api = new Api();