import {Component} from "./core/Component";
import view from "./Cube.hbs"


export class Cube extends Component {
    constructor() {
        super(view)
    }

    connected() {
        this.render()
    }
}

window.customElements.define('c-cube', Cube)
