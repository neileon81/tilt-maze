import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // this.element.textContent = "Hello World!"
    setTimeout(() => this.remove(), 7000)
  }

  remove() {
    this.element.remove();
  }
}
