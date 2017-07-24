import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class DiceDialog {

    constructor(dialogController){
        this.dialogController = dialogController;
    }

    activate(character){
        this.character = character;
    }
}