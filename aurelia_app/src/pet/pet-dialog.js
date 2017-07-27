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
}