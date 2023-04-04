import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "minutes", "seconds", "centiseconds", "centisecondsOutput", "form" ]

  initialize() {
    this.element.addEventListener("keydown", this.preventFormSubmitOnEnter.bind(this));
    // this.element.addEventListener("gameStarted", () => {this.gameStart()});
    // this.element.addEventListener("gameEnded", () => {this.gameEnd(true)});
    // this.element.addEventListener("gameResetted", () => {this.gameReset()});
  }

  preventFormSubmitOnEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  disconnect() {
    this.element.removeEventListener("keydown", this.preventFormSubmitOnEnter.bind(this));
  }

  connect() {
    this.gameReset();
    document.addEventListener("gameStarted", () => {this.gameStart()});
    document.addEventListener("gameEnded", () => {this.gameEnd(true)});
    document.addEventListener("gameResetted", () => {this.gameReset()});
  }

  displayTime() {
    this.centisecondsTarget.innerHTML = this.pad(parseInt(this.centiSeconds % 100));
    this.secondsTarget.innerHTML = this.pad(parseInt(this.centiSeconds/100) % 60);
    this.minutesTarget.innerHTML = this.pad(parseInt((this.centiSeconds/100) / 60));
    this.centiSeconds++;
  }

  gameStart() {
    this.ticker = setInterval(() => {
      this.displayTime()
    }, 10)
  }

  gameEnd(submit_it) {
    clearInterval(this.ticker);

    this.centisecondsOutputTarget.value = --this.centiSeconds;

    if(submit_it) {
      Turbo.navigator.submitForm(this.formTarget)
    }
  }

  gameReset() {
    this.gameEnd(false);
    this.centiSeconds = 0;
    this.displayTime();
  }

  pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
}
