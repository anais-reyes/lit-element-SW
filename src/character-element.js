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
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .character img {
            display: block;
            margin: auto;
            width: 200px;
            border-top-left-radius: 5px;
            border-top-rigth-radius: 5px;
          }

          .character div {
              background: white;
              width: 200px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
          }
          .character div p {
            color: gray;
            text-align: center;
            font-family: arial;
            margin: 0;
            font-family: 'Open Sans', sans-serif;
           
            
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
        


      
        <img src="https://starwars-visualguide.com/assets/img/characters/${this.characterIndex + 1}.jpg"/>
        <div><p>${this.character.name}</p></div>
        
       
        }
      </section>
       
        `;
    }
}
// Register the element with the browser
customElements.define('character-element', CharacterElement);