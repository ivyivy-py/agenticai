document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded successfully!');
    // alert('Welcome from main.js!'); // Keeping this commented out to avoid annoying pop-ups
});

class SimpleGreeting extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');
    const text = document.createElement('p');
    text.textContent = `Hello, ${this.getAttribute('name') || 'World'}!`;
    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        display: inline-block;
        background-color: #e0f7fa;
        color: #00796b;
      }
      p {
        margin: 0;
        padding: 0;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(text);
  }
}
customElements.define('simple-greeting', SimpleGreeting);