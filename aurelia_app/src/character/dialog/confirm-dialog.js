import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class ConfirmDialog {

  constructor(dialogController) {
    this.dialogController = dialogController;
  }

  activate(model) {
    this.title = model.title;
    this.text = model.text;
  }
}