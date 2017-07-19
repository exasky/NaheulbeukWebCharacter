export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Tous les personnages' },
      { route: 'character/:characterId?',     name: 'character',    moduleId: 'character/character', title: 'Character' }
    ]);

    this.router = router;
  }
}
