type TStoreHolder = {
  store: { [key: string]: StoreNode };
  storeNode: StoreNode;
};

export type TSubscriberItem = {
  varName: string;
  uuid: string;
};

class StoreNode {
  value: unknown = null;
  subscribers: { [key: string]: (val: unknown) => void };

  constructor(val = null) {
    this.value = val;
    this.subscribers = {};
  }

  set setter(val: unknown) {
    let a = this.value;
    let b = val;
    // не совсем верно, но для данного случая пойдет
    if (typeof val === "object") {
      a = JSON.stringify(a);
      b = JSON.stringify(b);
    }
    if (a !== b) {
      this.processSubscribers(val);
    }
    this.value = val;
  }

  get getter(): unknown {
    return this.value;
  }

  unSubscribe(uuid: string): void {
    delete this.subscribers[uuid];
  }

  subscribe(cb: (value: unknown) => void): string {
    let uuid = "";
    while (this.subscribers[uuid] || uuid === "") {
      uuid = `${(~~(Math.random() * 1e8)).toString(16)}-${(~~(
        Math.random() * 1e8
      )).toString(16)}-${(~~(Math.random() * 1e8)).toString(16)}`;
    }

    this.subscribers[uuid] = cb;
    cb(this.value);
    return uuid;
  }

  processSubscribers = (val: unknown): void => {
    for (const uuid in this.subscribers) {
      this.subscribers[uuid](val);
    }
  };
}

class State {
  storeHolder: TStoreHolder;

  constructor() {
    this.storeHolder = {
      store: {},
      storeNode: StoreNode,
    };
  }

  // получение значения параметра
  extract = (varName: string): unknown => {
    if (varName && this.storeHolder.store[varName]) {
      return this.storeHolder.store[varName].value;
    } else {
      return null;
    }
  };

  // установка значения параметра
  dispatch = <T>(varName: string, val: T): void => {
    if (varName && this.storeHolder.store[varName]) {
      this.storeHolder.store[varName].setter = val;
    } else {
      throw new Error(`State.Dispatch: wrong variable '${varName}'`);
    }
  };

  // подписка на изменение параметра
  subscribe = (
    varName: string,
    cb: (val: unknown) => void
  ): TSubscriberItem => {
    if (varName && this.storeHolder.store[varName]) {
      return {
        varName: varName,
        uuid: this.storeHolder.store[varName].subscribe(cb),
      };
    } else {
      throw new Error(`State.Subscribe: wrong variable '${varName}'`);
    }
  };

  // отписка
  unsubscribe = (subs: TSubscriberItem): void => {
    const { varName, uuid } = { ...subs };
    if (varName && this.storeHolder.store[varName]) {
      this.storeHolder.store[varName].unSubscribe(uuid);
    } else {
      throw new Error(`State.UnSubscribe: wrong variable '${varName}'`);
    }
  };

  // сохранение параметра
  store = (varName: string | null = null, val: unknown): boolean => {
    if (!varName) {
      throw new Error(`State.Store: wrong variable '${varName}'`);
    } else {
      this.storeHolder.store[varName] = new StoreNode(val);
      return true;
    }
  };

  // сброс
  clear = (): void => {
    this.storeHolder.store = {};
  };
}

export default new State();
