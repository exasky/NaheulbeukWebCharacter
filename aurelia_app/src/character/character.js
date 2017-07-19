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
          this.initCharacter();
        }
      });
    } else {
      this.heading = "Création de personnage";
      this.initCharacter();
    }
  }

  initCharacter() {
    // if (!this.character.characteristics) {
    //   this.character.characteristics = [];
    // }
    // for (var i = this.character.characteristics.length; i < 5; i++) {
    //   this.character.characteristics[i] = {};
    // }
    this.character.characteristics = this.initArray(this.character.characteristics);

    // if (!this.character.fightCharacteristics) {
    //   this.character.fightCharacteristics = [];
    // }
    // for (var i = this.character.fightCharacteristics.length; i < 5; i++) {
    //   this.character.fightCharacteristics[i] = {};
    // }
    this.character.fightCharacteristics = this.initArray(this.character.fightCharacteristics, 5);

    this.character.defItems = this.initArray(this.character.defItems, 6);

    this.character.attItems = this.initArray(this.character.attItems, 4);
    this.character.preciousItems = this.initArray(this.character.preciousItems, 10);
    this.character.items = this.initArray(this.character.items, 15);
  }

  initArray(element, size) {
    if (!element) {
      element = [];
    }
    for (var i = element.length; i < size; i++) {
      element[i] = {};
    }
    return element;
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
