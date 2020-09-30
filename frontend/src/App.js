import React, {Component} from 'react';
import './App.css';
import Drawer from "./Components/sidemenu.js";
import "bootstrap/dist/css/bootstrap.css";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FormContainer from "./Components/FormContainer.jsx"
import axios from 'axios';


class App extends Component {
  constructor(props) {
      super(props);
   this.state ={
     data: [],
   };
   this.getdata=this.getdata.bind(this);

 }


  getdata(){
   axios.get('/users')
   .then(data=>this.setState({data:data.data}))
 }
  render(){
  return (
	<div className="App">
<Router>
<Drawer />
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/user" >About</Link>
      </li>
      <li>
        <Link to="/additem">Dashboard</Link>
      </li>
    </ul>

    <hr />

    {/*
      A <Switch> looks through all its children <Route>
      elements and renders the first one whose path
      matches the current URL. Use a <Switch> any time
      you have multiple routes, but you want only one
      of them to render at a time
    */}
    <Switch>
      <Route exact path="/">
        home
      </Route>
      <Route path="/user" >

      <p>dn{this.state.data}</p>
      </Route>
      <Route path="/additem" component={FormContainer}>
      </Route>
    </Switch>
  </div>
</Router>
	</div>
	);
  }
}

export default withRouter(App);
