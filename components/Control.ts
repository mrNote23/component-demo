import view from "./Control.hbs";
import { Component } from "../core/Component";
import State from "../core/State";

export class Control extends Component {
  constructor() {
    super(view);
  }

  connected() {
    this.render();
    this.addSubscriber("hello", this.onHello);
  }

  clearAll = () => {
    State.dispatch("clear", Math.random());
  };

  onHello = (message: string): void => {
    if (message.length) {
      const tmp = this.querySelector(".message");
      tmp.textContent = `Hello from ${message}`;
      tmp.style.display = "block";
      setTimeout(() => {
        tmp.style.display = "none";
      }, 5000);
    }
  };

  addBox = () => {
    const box = document.createElement("box-element");
    box.className = "box";
    document.getElementById("boxes")!.appendChild(box);
  };
}

window.customElements.define("control-element", Control);
