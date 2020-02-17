/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


// Import LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';


export class StartLitElement extends LitElement {
  /**
   * Define properties. Properties defined here will be automatically 
   * observed.
   */
  static get properties() {
    return {
      message: { type: String },
      pie: { type: Boolean },
      characters: { type: Array}
    };
  }

  /**  
   * In the element constructor, assign default property values.
   */
  constructor() {
    // Must call superconstructor first.
    super();
    // Initialize properties
    this.loadComplete = false;
    this.characters = null;
  }

  static get styles() {
    return css`
    .page {
      background: black;
      margin: -8px;
    }
    .logo {
      height: 180px;
      width: auto;
      display: block;
      margin: auto;
    }
    .container {
      background: black;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
    }
    .character {
      padding: 10px;
      
    }

    .character img {
      display: block;
      margin: auto;
    }
    .character p {
      color: white;
      text-align: center;
    }
    `
  } 

  /**
   * Define a template for the new element by implementing LitElement's
   * `render` function. `render` must return a lit-html TemplateResult.
   */
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>
      <section class="page">
      <img class="logo" src="../assets/logo.png"/>
      <div class="container">
      ${this.characters ?
        this.characters.data.allPersons.map((character, index) => {
          const characterIndex = index + 1; 
          return html`
            <section class="character">
              <img src="https://starwars-visualguide.com/assets/img/characters/${characterIndex}.jpg"/>
              <p>Name: ${character.name}</p>
              <p>Height: ${character.height} cm</p>

            </section>
        `}) :
        html`<p> Loading Star Wars Characters...</p>`}
        </div>
        </section>

    `;
  }

  /**
   * Implement firstUpdated to perform one-time work on first update:
   * - Call a method to load the lazy element if necessary
   * - Focus the checkbox
   */
  firstUpdated() {
    this.loadLazy();
    const myInput = this.shadowRoot.getElementById('myinput');
  }

  /**
   * Event handler. Gets called whenever the checkbox fires a `change` event.
   * - Toggle whether to display <lazy-element>
   * - Call a method to load the lazy element if necessary
   */
  togglePie(e) {
    this.pie = !this.pie;
    this.loadLazy();
  }

  /**
   * If we need the lazy element && it hasn't already been loaded, 
   * load it and remember that we loaded it.
   */
  async loadLazy() {
    fetch('https://swapi.graph.cool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ allPersons { name, eyeColor, hairColor, height } }' }),
    })
      .then(res => res.json())
      .then(res => {this.characters = res; console.log(res.data)});
    console.log('loadLazy');
    if(this.pie && !this.loadComplete) {
      return import('./lazy-element.js').then((LazyElement) => {
        this.loadComplete = true;
        console.log("LazyElement loaded");
      }).catch((reason) => {
        this.loadComplete = false;
        console.log("LazyElement failed to load", reason);
      });
    }
  }
}




// Register the element with the browser
customElements.define('start-lit-element', StartLitElement);
