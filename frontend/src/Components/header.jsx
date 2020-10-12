import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-md-offset-2 intro-text">
                  <h1>
                    Win COVID-19 <b/>
                    <span></span>
                  </h1>
                  <p>
 Give supplies for anybody in isolation
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
