import { Component } from "../../lib/component.js";

export class About extends Component {
  constructor(root) {
    super(root, {}, s => `
      <div>
        <h1>About</h1>
        <p>This is the about page.</p>
      </div>
    `);
  }
}