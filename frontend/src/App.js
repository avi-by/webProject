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
import AddressList from "./Components/AddressList.jsx"
import AddAddress from "./Components/AddAddress.jsx"
import axios from 'axios';
import { Security, LoginCallback  } from '@okta/okta-react';
import Footer from "./Components/footer.jsx";



const OKTA_DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENT_ID = '0oa134osc0m6Ajlfl4x7';
const CALLBACK_PATH = '/implicit/callback';

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scope: SCOPES.split(/\s+/),
};


class App extends Component {
  constructor(props) {
      super(props);
   this.state={};



 }


  render(){
  return (
	<div className="App">
<Router>
 <Security {...config}>
<Drawer />

    <Switch>
     <Route path={CALLBACK_PATH} component={LoginCallback} />
      <Route exact path="/">home</Route>
      <Route path="/additem" component={FormContainer}/>
	  <Route path="/listOfAddresses" component={AddressList}/>
	   <Route path="/addAddress" component={AddAddress}/>
      {/*<Route path="/addvolunteer" component={AddItem}/>*/}
    </Switch>

    <Footer />

  </Security>
</Router>
	</div>
	);
  }
}

export default withRouter(App);
