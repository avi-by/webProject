import React, { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './welcome.css';
import 'bootstrap/dist/css/bootstrap.css';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      name:''
    };

 this.updateName = this.updateName.bind(this);
  
  }

  updateName(e) {
      this.setState({name: e.target.value});
   }

   

  render() {
    return (
      
     <div className="container">
        <div className="login-container">
              <div id="output"></div>
              <div className="avatar">{this.getShortName(this.state.name)}</div>
              <div className="form-box">
                  <form action="" method="">
                      <input name="user" type="text"  value = {this.state.name} 
               onChange = {this.updateName} placeholder="username"/>
                      <Link to = {'/chat/'+this.state.name}>
                      <button className="btn btn-info btn-block login"  disabled = {this.state.name == ''}>join </button>
                      </Link>
                  </form>
              </div>
          </div>
      </div>
   
    
    );


  }

getShortName(name){
    let short = '';
    let arr = name.split(" ")
    arr.forEach(function(name) {
      short+=name.charAt(0);
    });
    return short.toUpperCase();
    
  }
  
}
export default Welcome;