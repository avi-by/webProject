import React, {Component} from "react";
import {withOktaAuth} from "@okta/okta-react";
import ReactTable from "react-table";
import Map from "./Map";
import "react-table/react-table.css";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

async function checkUser() {


}
export default withOktaAuth(
  class Home extends Component {

    constructor(props) {
      super(props);
      this.state = {userInfo: null, data: [], cordinates:[]};
        }

    async componentDidMount() {
      this.setState({
        isLoading:true
      });
      if ( !this.state.userInfo) {
        const userInfo = await this.props.authService.getUser();
        console.log(userInfo);
        await fetch(`/usersdb/ReadRecord/${userInfo.sub}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then((value) => {
          value.json().then((res) => {
            console.log("res",res);
            var arr=[];
            res[0].locations.forEach((item, i) => {
              arr.push(item.cordinate)
            });

            this.setState({
              userInfo:userInfo,
              data:res,
              cordinates:arr
            })
          })
        })
      }


    }

    async componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    render() {
      console.log("state",this.state);
      const { isLoading} = this.state;
      const columns = [

        {
          Header: "Street",
          accessor: "street",
          filterable: false
        },
        {
          Header: "Number",
          accessor: "number",
          filterable: false
        },
        {
          Header: "City",
          accessor: "city",
          filterable: false
        },
        {
          Header: "Date",
          accessor: "date",
          filterable: false
        }
      ];
      return (
        <div>
          {this.state.userInfo && (
            <div>
              <p>Welcome {this.state.userInfo.name}!</p>
              <p>today jobs:</p>
              <Wrapper>

                  <ReactTable
                    data={this.state.data[0].locations}
                    columns={columns}

                    defaultPageSize={10}
                    showPageSizeOptions={true}
                    minRows={0}
                  />
                  <Map
                    city={this.state.data[0].locations[0].city}
                    locations={this.state.cordinates}

                  />
              </Wrapper>

            </div>
          )}
        </div>
      );
    }
  }
);
