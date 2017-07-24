import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = false;
      config.settings.keyboard = true;
      config.settings.centerHorizontalOnly = true;
    });

  aurelia.start().then(() => aurelia.setRoot());
}
