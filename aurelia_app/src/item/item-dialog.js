import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class ItemDialog {

    tabActivated = "AEP";

    constructor(dialogController){
        this.dialogController = dialogController;
    }

    activate(character){
        this.character = character;
    }

    activateTab(tabName) {
        this.tabActivated = tabName;
    }
}