import { inject } from 'aurelia-framework';
import { CharacterDao } from 'character/dao/character-dao';
import { Router } from 'aurelia-router';

@inject(Router, CharacterDao)
export class Welcome {
  heading = 'Liste des personnages';

  constructor(router, characterDao) {
    this.router = router;
    this.characterDao = characterDao;
  }

  activate() {
    this.characterDao.getAllCharacters().then(characters => {
      this.characters = characters;
    })
  }

  createCharacter() {
    this.router.navigate("character/");
  }

  goToCharacter(character) {
    if (character) {
      this.router.navigate("character/" + character._id);
    }
  }
}
