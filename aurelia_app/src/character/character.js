import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';
import { ItemDialog } from 'item/item-dialog';
import { ConfirmDialog } from './dialog/confirm-dialog'
import { SkillDialog } from 'skill/skill-dialog';
import { CharacterDao } from './dao/character-dao';
import 'toastr';

@inject(Router, DialogService, CharacterDao)
export class Character {
  sexs = ['mars', 'venus'];

  unmodifiedCharacter;
  character;

  constructor(router, dialogService, characterDao) {
    this.router = router;
    this.dialogService = dialogService;
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
      }, error => {
        toastr.error("Personnage non trouvé");
        this.router.navigate("/");
      });
    } else {
      this.heading = "Création de personnage";
      this.character = {};
      this.initCharacter();
    }
  }

  initCharacter() {
    this.character.characteristics = this.initArray(this.character.characteristics, 5);
    this.character.fightCharacteristics = this.initArray(this.character.fightCharacteristics, 5);
    this.character.defItems = this.initArray(this.character.defItems, 6);
    this.character.attItems = this.initArray(this.character.attItems, 4);
    this.character.preciousItems = this.initArray(this.character.preciousItems, 10);
    this.character.items = this.initArray(this.character.items, 21);
    this.character.skills = this.initArray(this.character.skills, 15);
    this.updatePvBar();
    this.updatePaBar();
    this.initUnmodifiedCharacter();
  }

  initUnmodifiedCharacter() {
    this.unmodifiedCharacter = JSON.parse(JSON.stringify(this.character));
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

  goToHome() {
    if (JSON.stringify(this.unmodifiedCharacter) !== JSON.stringify(this.character)) {
      this.dialogService.open({
        viewModel: ConfirmDialog,
        model: {
          title: null,
          text: "Le personnage n'a pas été sauverardé. Voulez-vous continuer? "
        }
      }).whenClosed(response => {
        if (!response.wasCancelled) {
          this.router.navigate("/");
        }
      })
    } else {
      this.router.navigate("/");
    }
  }

  save() {
    this.characterDao.saveOrUpdateCharacter(this.character).then(result => {
      toastr.success("Personnage sauvé");
      if (!this.character._id) { // If we are on save
        result.json().then(characterId => {
          this.router.navigate("/character/" + characterId);
        });
      } else {
        this.initUnmodifiedCharacter();
      }
    });
  }

  delete() {
    this.dialogService.open({
      viewModel: ConfirmDialog,
      model: {
        title: "Suppression de personnage",
        text: "Êtes-vous sûr de vouloir supprimer " + this.character.name
      }
    }).whenClosed(response => {
      if (!response.wasCancelled) {
        this.characterDao.deleteCharacter(this.character).then(result => {
          toastr.success("Personnage supprimé");
          this.router.navigate("/");
        });
      }
    });
  }

  updatePvBar() {
    this.updateProgressBar('#pvBar', this.character.maxPv, this.character.currentPv);
  }

  updatePaBar() {
    this.updateProgressBar('#paBar', this.character.maxPa, this.character.currentPa);
  }

  updateProgressBar(id, max, current) {
    if (max && current && max != 0) {
      var percentage = (current * 100) / max;
      var progressBarCLass = "progress-bar";
      if (percentage > 60) {
        progressBarCLass += " progress-bar-success";
      } else if (percentage > 30) {
        progressBarCLass += " progress-bar-warning";
      } else {
        progressBarCLass += " progress-bar-danger";
      }
      $(id)[0].setAttribute("style", "width:" + percentage + "%");
      $(id)[0].setAttribute("class", progressBarCLass);
    }
  }

  openBagDialog() {
    this.dialogService.open({
      viewModel: ItemDialog,
      model: this.character
    })
  }

  openSkillDialog() {
    this.dialogService.open({
      viewModel: SkillDialog,
      model: this.character
    })
  }
}
