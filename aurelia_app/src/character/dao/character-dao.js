import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class CharacterDao {

  port = ":3000";
    
  constructor(http) {
    var loc = window.location;
    http.configure(config => {
      config
        .useStandardConfiguration()
        //.withBaseUrl(window.location.hostname + this.port + window.location.pathname)
        .withBaseUrl(loc.protocol + "//" + loc.hostname + ":3000/characters")
        .withDefaults({
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-type' : 'application/json'
          }
        });
    });
    
    this.http = http;
  }

  findByName(name) {
    return this.http.fetch('?name=' + name)
      .then(response => response.json());
  }
  
  findCharacter(characterId) {
    return this.http.fetch('/' + characterId, {
      method: 'get'
    }).then(response => response.json());
  }
  
  getAllCharacters() {
    return this.http.fetch('/', {
      method: 'get'
    }).then(response => response.json());
  }

  saveOrUpdateCharacter(character) {
    if (character._id) { // Already exists in base
      return this.updateCharacter(character);
    } else {
      return this.saveCharacter(character);
    }
  }

  updateCharacter(character) {
    return this.http.fetch('/' + character._id, {
      method: 'put',
      body: json(character)
    });
  }

  saveCharacter(character) {
    return this.http.fetch('/', {
      method: 'post',
      body: json(character)
    });
  }

  deleteCharacter(character) {
    return this.http.fetch('/' + character._id, {
      method: 'delete'
    });
  }
}