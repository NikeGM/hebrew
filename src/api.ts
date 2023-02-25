import axios from 'axios';
import {
  CardsFilters,
  EditWordsFilters,
  Language,
  Word,
  WordClass
} from './types';
import { Field, fieldExist } from './utils';
import { Mode } from './components/startScreen/startScreen';

export class Api {
  private url = process.env.REACT_APP_API_URL;

  // private url = 'http://192.168.1.16:9999/api';

  constructor() {
  }

  public addWordWithForms(words: Word[]) {
    console.log(words);
    return axios.post(`${api.url}/words/edit/save`, words.map(w => this.convertWord(w, words[0])));
  }

  public saveForms(words: Word[], firstForm: Word) {
    const lastIndex = Math.max(...(firstForm.forms || []).map(word => word.formIndex));
    words.map((word, index) => this.convertWord({
      ...word,
      formIndex: index + lastIndex + 1
    }, firstForm));
    return axios.post(`${api.url}/words/edit/save-forms`, words.map(w => this.convertWord(w, firstForm)));
  }

  public updateWordWithForms(words: Word[]) {
    return axios.post(`${api.url}/words/edit/update`, words.map(w => this.convertWord(w, words[0])));
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
    console.log(result.data);
    return result.data;
  }

  public async getWordWithForms(wordId: number): Promise<Word[]> {
    const result = await axios.post(`${api.url}/words/edit/get-word`, { wordId, withForms: true });
    return result.data;
  }

  public async saveStats(wordId: number, isCorrect: boolean, mode: Mode) {
    const result = await axios.post(`${api.url}/words/cards/save-stats`, { wordId, isCorrect, mode });
    return result.data;
  }

  private getTags(wordTags: string[], tags: string[]) {
    const newTags = [...wordTags];
    for (let tag of tags) {
      if (!wordTags.find(t => tag === t)) {
        newTags.push(tag);
      }
    }
    return newTags;
  }

  private convertWord(word: Word, firstForm: Word) {
    const isInfinitive = word.class === WordClass.VERB && word.formIndex === 0;

    return ({
      wordId: word.wordId || undefined,
      word: word.word,
      translation: word.translation,
      pronunciation: word.pronunciation,
      class: word.class,
      comment: firstForm.comment,
      formIndex: word.formIndex,
      formId: firstForm.formId,
      number: word.number || firstForm.number || null,
      gender: word.gender || firstForm.gender || null,
      binyan: word.binyan || firstForm.binyan || null,
      face: word.face || firstForm.face || null,
      group: word.group || firstForm.group || null,
      root: firstForm.root,
      tense: word.tense || firstForm.tense || null,
      isPairing: word.class === WordClass.NOUN ? false : null,
      isInfinitive: word.class === WordClass.VERB ? isInfinitive : null,
      tags: word.formIndex === 0 ?
        isInfinitive ?
          this.getTags(word.tags,
        [ word.binyan as string, word.group as string, 'infinitive', word.class]) :
        this.getTags(word.tags, [word.class]) : []
    });
  };
}

export const api = new Api();