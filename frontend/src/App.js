import React, {Component} from "react";
import "./App.css";
import Drawer from "./Components/sidemenu.js";
import "bootstrap/dist/css/bootstrap.css";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddUser from "./Components/AddUser.jsx";
import AddressList from "./Components/AddressList.jsx";
import AddAddress from "./Components/AddAddress.jsx";
import UpdateAddress from "./Components/UpdateAddress.jsx";
import UpdateUser from "./Components/UpdateUser";
import UsersList from "./Components/UsersList";
//import axios from 'axios';
import {Security, LoginCallback} from "@okta/okta-react";
import Footer from "./Components/footer.jsx";
import config from "./Components/auth.js";
import Jobs from "./Components/JobsInWorks";
import Placement from "./Components/Placement";
import VolunteerJobs from "./Components/VolunteerJobs";
import Chat from './chat';
import Welcome from './welcome';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:''
   };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Security {...config}>
            <Drawer />

            <Switch>
              <Route path={config.CALLBACK_PATH} component={LoginCallback} />
              <Route exact path="/">
                home
              </Route>
              <Route exact path="/adduser" component={AddUser} />
              <Route exact path="/userlist" component={UsersList} />
              <Route path="/listOfAddresses" component={AddressList} />
              <Route path="/addAddress" component={AddAddress} />
              <Route
                path="/addresses/update/:id"
                exact
                component={UpdateAddress}
              />
              <Route path="/userlist/update/:id" exact component={UpdateUser} />
              <Route path="/placement" component={Placement} />
              <Route exact path="/jobs" component={Jobs} />
              <Route exact path="/myjobs" component={VolunteerJobs} />
              <Route  path='/chatUser' component={Welcome} />
	   <Route exact path='/chat/:name' component={Chat} />
            </Switch>

            <Footer />
          </Security>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
