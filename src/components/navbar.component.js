import { Component } from "../../lib/component.js";


export class NavBar extends Component {
  constructor(root, props) {
    super(root, { theme: props }, "./src/components/nav-bar.component.html");
  }
}
