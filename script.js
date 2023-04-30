let keyboard = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57];
document.onkeypress = function (event) {
  //console.log(event);
  keyboard.push(event.charCode);
  console.log(keyboard);
};

function init() {
  let out = "";
  for (let i = 0; i < keyboard.length; i++) {
    out +=
      '<div class="keyboard-key">' + String.fromCharCode(keyboard[i]) + "<div>";
  }
  document.querySelector("#keyboard").innerHTML = out;
}

init();
