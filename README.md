# Альтернативный вариант реализации компонентного подхода

[Пример в песочнице](https://stackblitz.com/edit/typescript-5pvnqs)

## Управление состояниями с помощью класса `State()`

### **`Class State()`**

- `store()` - сохранение объекта (переменной) без оповещения подписчиков
- `extract()` - извлечение объекта
- `subscribe()` - подписка на изменение объекта
- `unsubscribe()` - отписка
- `dispatch()` - изменение объекта с оповещением подписчиков
- `clear()` - удаление всех объектов и подписчиков

## Компоненты приложения создаются на базе класса `Component()`

### **`Class Component()`**

Шаблон компонента (precompiled hbs) передается в методе `super()` при создании экземпляра класса,
либо позже в `this.view` до вызова метода `this.render()`

Перед использованием созданного компонента, его необходимо объявить:

```typescript
window.customElements.define('main-component', MainComponent)
```

### Методы используемые внутри компонента

- `render()` - рендер компонента с параметрами? для шаблона handlebars
- `connected()` - метод вызывается после монтирования компонента в DOM
- `disconnected()` - метод вызывается перед демонтированием компонента из DOM
- `addSubscriber()` - добавляет подписчика State
- `addListener()` - добавляет слушателя eventListener
- `props` - пропсы компонента прописанные в атрибуте props-*
- `propsChanged()` - метод вызывается при изменении пропсов
- `createEvent()` - создание события с названием eventName

После демонтирования компонента из DOM, все подписчики и слушатели установленные через `addSubscriber` и
`addListener` - удаляются.
Т.е. слушатели событий назначаются следующим образом: `this.addListener(node, 'click', clickHandler)`

Все параметры (пропсы, слушатели событий) прописываются в теге компонента с помощью атрибутов `event-*` и `props-*`

 ```HTML

<main-component
  class="list-users"
  props-users="[[usersList]]"
  event-select="[[onSelect]]"
>
</main-component>
 ```

#### Пример использования:

```typescript
// MainComponent.ts
import view from "./MainComponent.hbs";
import {State} from "./State";
import {Component} from "./Component";

export class MainComponent extends Component {
  props: {
    title: string;
    counter: number;
  };

  constructor() {
    super(view);
  }

  onInput = (e: InputEvent): void => {
    this.getElementsByTagName("h1")[0].textContent = e.target.value;
  };

  onClick = (): void => {
    this.props.counter = 0;
    State.dispatch("counter", this.props.counter);
  };

  showCounter = (val: number): void => {
    this.getElementsByTagName("h2")[0].textContent = val;
  };

  connected(): void {
    this.getProps.then((props: any) => {
      this.props = props;
      this.render({...this.props});

      State.store("counter", this.props.counter);
      this.addSubscriber("counter", this.showCounter);

      setInterval(() => {
        this.props.counter++;
        State.dispatch("counter", this.props.counter);
      }, 1000);
    });
  }
}

```

```HTML
<!--MainComponent.hbs-->
<h1>{{title}}</h1>
<h2>{{counter}}</h2>
<input type="text" name="title" event-input="[[onInput]]" value="{{title}}">
<button event-click="[[onClick]]">Reset counter</button>
```
