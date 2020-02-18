// Import LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element'
import './character-element.js'
export class StartLitElement extends LitElement {

  static get properties() {
    return {
      characters: { type: Array},
    };
  }

  
  constructor() {
    super();
    // Initialize properties
    this.characters = null;
    this.prop = 'string'
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
      grid-template-columns: repeat(5, 1fr);
      padding: 30px;
    }
    
    `
  } 

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
        this.characters.data.allPersons.map((character, characterIndex) => {
          if(characterIndex < 16) {
            return html`
          <character-element data-character="${characterIndex + 1}" .character=${character} .characterIndex=${characterIndex} @click=${this.handleClick} }></character-element>   
        `
          }
          else if(characterIndex > 16) {
            return html`
          <character-element data-character="${characterIndex + 2}" .character=${character} .characterIndex=${characterIndex + 1} @click=${this.handleClick} }></character-element>   
        `
          }
          }) :
        html`<p> Loading Star Wars Characters...</p>`}
        </div>
        </section>
    `;
  }

  handleClick(e) {
    console.log('click', this.characters.data.allPersons[e.target.dataset.character - 1], e.target.dataset.character);
    alert(this.characters.data.allPersons[e.target.dataset.character - 1].name)
  }

  firstUpdated() {
    this.loadLazy();
    console.log('init')
    
  }

  async loadLazy() {
    fetch('https://swapi.graph.cool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ allPersons { name, eyeColor, hairColor, height } }' }),
    })
      .then(res => res.json())
      .then(res => this.characters = res);
    console.log('loadLazy');
  }
}

// Register the element with the browser
customElements.define('start-lit-element', StartLitElement);
