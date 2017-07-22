import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap')
    .plugin('aurelia-dialog');;

  aurelia.start().then(() => aurelia.setRoot());
}
