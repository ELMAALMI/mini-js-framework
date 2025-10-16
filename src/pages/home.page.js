import { Component } from "../../lib/component.js";
import { NavBar } from "../components/navbar.component.js";
export class Home extends Component {
  constructor(root) {
      super(root, { count: 0 }, "./src/pages/home.page.html", {
        NavBar: NavBar
    });
  }
    
  inc() {
    this.state.count++;
  }
    mounted() {
    console.log("Home component mounted");
  }
}