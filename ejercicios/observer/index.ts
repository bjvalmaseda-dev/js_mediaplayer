interface Observer {
  update: (data: any) => void;
}

interface Subject {
  notify: (data: any) => void;
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
}

class BitcoinPrice implements Subject {
  observers: Observer[] = [];

  constructor() {
    const el: HTMLInputElement = document.querySelector(
      "#value"
    ) as HTMLInputElement;

    el.addEventListener("change", () => this.notify(el.value));
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer: Observer) {
    const index = this.observers.findIndex((obs) => {
      return obs === observer;
    });

    this.observers.splice(index, 1);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class DisplayPrice implements Observer {
  private el: HTMLElement;
  constructor() {
    this.el = document.querySelector("#price") as HTMLElement;
  }

  update(data: any) {
    this.el.innerText = data;
  }
}

const value = new BitcoinPrice();
const display = new DisplayPrice();

value.subscribe(display);

setTimeout(() => value.unsubscribe(display), 5000);
