import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { CharacterDao } from './dao/character-dao';
import 'toastr';

@inject(Router, CharacterDao)
export class Character {
  sexs = ['mars', 'venus'];

  character;

  constructor(router, characterDao) {
    this.router = router;
    this.characterDao = characterDao;
  }

  activate(params) {
    if (params.characterId) {
      this.characterDao.findCharacter(params.characterId).then(character => {
        if (!character) {
          toastr.error("Personnage non trouvé");
          this.router.navigate("/");
        } else {
          this.character = character;
          this.heading = "Fiche personnage";
        }
      });
    } else {
      this.heading = "Création de personnage";
    }
  }

  save() {
    this.characterDao.saveOrUpdateCharacter(this.character).then(result => {
      toastr.success("Personnage sauvé");
      this.navigateOnSave(result);
    })
  }

  delete() {
    this.characterDao.deleteCharacter(this.character).then(result => {
      toastr.success("Personnage supprimé");
      this.router.navigate("/");
    });
  }

  navigateOnSave(resultOfSave) {
    if (!this.character._id) { // If we are on save
      resultOfSave.json().then(characterId => {
        this.router.navigate("/character/" + characterId);
      });
    }
  }
}
