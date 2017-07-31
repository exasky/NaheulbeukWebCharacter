import { inject } from 'aurelia-framework';
import { DialogController, DialogService } from 'aurelia-dialog';
import { ConfirmDialog } from 'character/dialog/confirm-dialog'

@inject(DialogController, DialogService)
export class PetDialog {
    
    constructor(dialogController, dialogService) {
        this.dialogController = dialogController;
        this.dialogService = dialogService;
    }

    activate(character) {
        this.character = character;
        this.pets = this.character.pets;
        this.selectedPet = this.pets[0];
    }

    attached() {
        for(var pet of this.pets) {
            this.updatePvBar(pet);
        }
    }

    selectPet(pet) {
        this.selectedPet = pet;
    }

    addPet() {
        this.pets.push({});
        this.selectPet(this.pets[this.pets.length - 1]);
        this.selectedPet.name = "Nouveau Familier";
    }

    deletePet(pet) {
        this.dialogService.open({
            viewModel: ConfirmDialog,
            model: {
                title: "Suppression de familier",
                text: "Êtes-vous sûr de vouloir supprimer " + pet.name
            }
        }).whenClosed(response => {
            if (!response.wasCancelled) {
                var i = this.pets.indexOf(pet);
                if (i != -1) {
                    this.pets.splice(i, 1);
                }
                if (this.pets[0]) {
                    this.selectPet(this.pets[0]);
                }
            }
        });
    }

    updatePvBar(pet) {
        var index = this.pets.indexOf(pet);
        console.log("PAS ENCORE");
        var id= "#pvBar-" + index;
        if (pet.maxPv && pet.currentPv && pet.maxPv != 0) {
            var percentage = (pet.currentPv * 100) / pet.maxPv;
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
}
