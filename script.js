let Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    //всплывание + сокрытие клавиатуры
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },
  init() {
    //Craete main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    //Setup main elements +вплытие-сокрытие клавы
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    //Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    //Automaticaly use keyboard for elements with .use-keyboard-inut
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    let fragment = document.createDocumentFragment();
    let keyLayot = [
      "`",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "-",
      "backspace",
      "del",
      "tab",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "[",
      "]",
      "#",
      "capslock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "'",
      "enter",
      "shift",
      "z",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "/",
      "↑",
      "ctrl",
      "win",
      "alt",
      "space",
      "alt",
      "←",
      "↓",
      "→",
      "ctrl",
    ];

    //Create HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayot.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["del", "#", "enter", "↑"].indexOf(key) !== -1;

      // Attribute / classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      //backspase
      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "del":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("del");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "tab":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("tab");

          keyElement.addEventListener("click", () => {
            this.properties.value += "  ";
            this._triggerEvent("oninput");
          });

          break;

        //capslock
        case "capslock":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key-activatable"
          );
          keyElement.innerHTML = createIconHTML("capslock");

          keyElement.addEventListener("click", () => {
            this._toogleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "shift":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key-activatable"
          );
          keyElement.innerHTML = createIconHTML("shift");

          keyElement.addEventListener("click", () => {
            this._toogleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("enter");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLocaleLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toLocaleUpperCase()
              : key.toLocaleLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toogleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, onimput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = onimput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = onimput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
