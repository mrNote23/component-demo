import view from "./App.hbs";
import { Component } from "./core/Component";
import State from "./core/State";
import "./components/Box";
import "./components/Control";

export class App extends Component {
  constructor() {
    super(view);
    State.store("hello", "");
    State.store("clear", 0);
  }

  propsChanged(prop: string, oldValue: any, newValue: any) {
    if (prop === "bgimage") {
      this.style.backgroundImage = `url('${newValue}')`;
    }
  }

  connected() {
    this.render();
  }
}

window.customElements.define("main-app", App);
