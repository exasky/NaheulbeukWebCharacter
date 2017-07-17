import {inject} from 'aurelia-framework';
import {CharacterDao} from './dao/character-dao';
import 'fetch';

@inject(CharacterDao)
export class Character {
  character;

  constructor(characterDao) {
    this.characterDao = characterDao;
  }

  activate(params) {
    if (params.name) {
      this.characterDao.findByName(params.name).then(character => {
        this.character = character;
      });
    }
  }

  save() {
    this.characterDao.saveCharacter(this.character).then(result => {
      console.log(result);
    })
  }
}
