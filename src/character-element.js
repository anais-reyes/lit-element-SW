import { LitElement, html, css } from 'lit-element';

export class CharacterElement extends LitElement {

    static get properties() {
        return {
          character: {type: Object},
          characterIndex: {type: Number}
        };
      }

    constructor() {
        super();
        this.character = null;
        this.characterIndex = null;
    }  

    static get styles() {
        return css`
        .character {
            padding: 10px;
            margin: 1px solid white;
          }
          .character img {
            display: block;
            margin: auto;
          }
          .character p {
            color: white;
            text-align: center;
            font-family: arial;
          }
          `
    }

    render() {
        return html`
        <style>
            :host { display: block; }
            :host([hidden]) { display: none; }
        </style>
        <section class="character">
        <img src="https://starwars-visualguide.com/assets/img/characters/${this.characterIndex}.jpg"/>
        <p>Name: ${this.character.name}</p>
        <p>Height: ${this.character.height} cm</p>
        ${this.character.hairColor ? html`<p>Hair color: ${this.character.hairColor[0].toLowerCase()}</p>` :
        html``
        }
        ${this.character.eyeColor ? html`<p>Eye Color: ${this.character.eyeColor[0].toLowerCase()}</p>` : 
        html``
        }
      </section>
       
        `;
    }
}
// Register the element with the browser
customElements.define('character-element', CharacterElement);