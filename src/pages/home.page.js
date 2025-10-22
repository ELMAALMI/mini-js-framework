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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">${state.title}</a>
        <button class="btn btn-sm btn-outline-secondary">About</button>
      </div>
      </nav>

      <div class="container py-4">
      <div class="row">
        <div class="col-md-8">
        <div class="card mb-3">
          <div class="card-body">
          <h5 class="card-title">${state.message}</h5>
          <p class="card-text">Use the controls below to update the counter.</p>

          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-danger me-2" data-action="decrement">-</button>
            <span class="fs-4 mx-2">${state.count}</span>
            <button type="button" class="btn btn-success ms-2" data-action="increment">+</button>
            <button type="button" class="btn btn-outline-secondary ms-3" data-action="reset">Reset</button>
          </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">Notes</h6>
          <p class="card-text">Responsive layout powered by Bootstrap. Wire the buttons to your component methods (e.g. using data-action attributes).</p>
          </div>
        </div>
        </div>

        <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
          <h5 class="card-title">Quick Actions</h5>
          <p class="card-text">Shortcuts and links</p>
          <a href="#" class="btn btn-primary">Learn more</a>
          </div>
        </div>
        </div>
      </div>
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