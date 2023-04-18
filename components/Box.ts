import view from "./Box.hbs";
import { Component } from "../core/Component";
import State from "../core/State";

export class Box extends Component {
  fieldValue: string = "";
  info: HTMLElement;
  input: HTMLElement;

  constructor() {
    super(view);
  }

  connected() {
    this.render({ fieldValue: this.fieldValue });
    this.input = this.getElementsByTagName("input")[0];
    this.info = this.getElementsByTagName("p")[0];
    this.addSubscriber("clear", () => {
      this._setField("");
    });
  }

  getFieldValue = () => {
    return this.fieldValue;
  };

  propsChanged() {}

  onInput = (e: any): void => {
    this._setField(e.target.value);
  };

  removeMe = () => {
    this.remove();
  };

  sayHello = () => {
    State.dispatch("hello", this.fieldValue);
  };
  clearInput = () => {
    this._setField("");
  };

  _setField = (val: string) => {
    this.fieldValue = val;
    this.input.value = val;
    this.info.textContent = val;
  };
}

window.customElements.define("box-element", Box);
