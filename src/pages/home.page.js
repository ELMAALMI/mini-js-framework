import { Component } from '../../lib/component.js';

export class HomeComponent extends Component {
  constructor(root, props, components, eventBus) {
    super(root, { 
      title: 'Home Page',
      count: 0,
      message: 'Welcome to the home page!'
    }, components, eventBus);
  }

  template(state) {
    return `
      <div class="home-page">
        <h1>{{title}}</h1>
        <p>{{message}}</p>
        <div class="counter">
          <p>Count: <span data-bind="count">{{count}}</span></p>
          <button @click="increment">Increment</button>
          <button @click="decrement">Decrement</button>
          <button @click="reset">Reset</button>
        </div>

        <div v-show="count > 5">
          <p style="color: green;">Wow, count is greater than 5!</p>
        </div>

        <div class="input-demo">
          <label>Message: 
            <input type="text" data-model="message" placeholder="Enter a message">
          </label>
          <p>You typed: {{message}}</p>
        </div>

        <nav>
          <a href="#/about">Go to About</a>
        </nav>
      </div>
    `;
  }

  increment() {
    this.state.count++;
  }

  decrement() {
    this.state.count--;
  }

  reset() {
    this.state.count = 0;
  }

  mounted() {
    console.log('HomeComponent mounted!');
  }
}