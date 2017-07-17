export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Tous les personnages' },
      //{ route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' },
      { route: 'character',     name: 'character',    moduleId: 'character/character',    nav: true, title: 'Character' }
    ]);

    this.router = router;
  }
}
