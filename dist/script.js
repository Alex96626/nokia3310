const debounceSetValue = debounce(setValue, 400);

function iterateValueOnInput(event) {
  const target = event.target;
  const buttonKey = target.dataset.key;

  if (buttonKey !== window.nokia.prevKey) {
    window.nokia.count = 0;
    window.nokia.statusMoveCursor = true;
  }

  const valueList = target.dataset.keyValue?.split("");

  if (!valueList) {
    return;
  }

  if (!window.nokia.statusMoveCursor) {
    window.nokia.sms.value =
      window.nokia.sms.value.slice(0, -1) + valueList[window.nokia.count];
    debounceSetValue(valueList[window.nokia.count]);
  } else {
    window.nokia.sms.value =
      window.nokia.sms.value + valueList[window.nokia.count];
    window.nokia.statusMoveCursor = false;
  }

  window.nokia.count += 1;

  if (window.nokia.count >= valueList.length) {
    window.nokia.count = 0;
  }

  window.nokia.prevKey = buttonKey;
}

function setValue() {
  window.nokia.statusMoveCursor = true;
}

function debounce(callBack, interval, leadingExecution) {
  let timerId;

  return function () {
    let wasFunctionScheduled = typeof timerId === "number";
    clearTimeout(timerId);
    const funcToDebounceThis = this,
      funcToDebounceArgs = arguments;
    const funcToSchedule = function () {
      clearTimeout(timerId);
      timerId = null;
      if (!leadingExecution) {
        callBack.apply(funcToDebounceThis, funcToDebounceArgs);
      }
    };
    timerId = setTimeout(funcToSchedule, interval);
    if (!wasFunctionScheduled && leadingExecution)
      callBack.apply(funcToDebounceThis, funcToDebounceArgs);
  };
}

function createPhonePicture() {
  const phone = document.createElement("img");
  phone.setAttribute("src", "./images/phone.png");
  phone.classList.add("phone__image");

  return phone;
}

function createInutField() {
  const inputFieldWrapper = document.createElement("label");
  inputFieldWrapper.classList.add("sms-value");

  const inputField = document.createElement("textarea");
  inputField.classList.add("sms-input");
  inputField.setAttribute("readonly", true);

  inputFieldWrapper.appendChild(inputField);

  return inputFieldWrapper;
}

function createPhoneButtons() {
  const keyList = [
    {
      key: 1,
      value: "`",
      className: "phone__button_key-one",
    },
    {
      key: 2,
      value: "абвг",
      className: "phone__button_key-two",
    },
    {
      key: 3,
      value: "дежз",
      className: "phone__button_key-three",
    },
    {
      key: 4,
      value: "ийкл",
      className: "phone__button_key-four",
    },
    {
      key: 5,
      value: "мноп",
      className: "phone__button_key-five",
    },
    {
      key: 6,
      value: "рсту",
      className: "phone__button_key-six",
    },
    {
      key: 7,
      value: "фхцч",
      className: "phone__button_key-seven",
    },
    {
      key: 8,
      value: "шщъы",
      className: "phone__button_key-eight",
    },
    {
      key: 9,
      value: "ьэюя",
      className: "phone__button_key-nine",
    },
  ];

  const buttons = [];

  const buttonList = document.createElement("ul");
  buttonList.classList.add("phone__buttons");

  for (const { key, value, className } of keyList) {
    const button = document.createElement("li");
    button.classList.add("phone__button", className);
    button.dataset.keyValue = value;
    button.dataset.key = key;

    buttons.push(button);
  }

  buttonList.append(...buttons);

  return buttonList;
}

function init() {
  window.nokia = {};

  const page = document.querySelector("body");

  const phone = document.createElement("div");
  phone.classList.add("phone");

  phone.appendChild(createPhonePicture());
  phone.appendChild(createInutField());
  phone.appendChild(createPhoneButtons());

  page.appendChild(phone);

  window.nokia.sms = document.querySelector(".sms-input");
  const keywordKey = document.querySelectorAll(".phone__button");

  window.nokia.count = 0;
  window.nokia.prevKey;
  window.nokia.statusMoveCursor = false;

  for (const key of keywordKey) {
    key.addEventListener("click", iterateValueOnInput);
  }
}

init();
