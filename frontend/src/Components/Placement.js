import React, {Component, useState, useEffect} from "react";
import ReactTable from "react-table";
import Map from "./Map";
import "react-table/react-table.css";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Button from "react-bootstrap/Button";

const Title = styled.h1.attrs({
  className: "h1"
})``;

const Label = styled.h4`
  margin: 5px;
`;
function LoadingButton(props) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log("button", props);
    if (isLoading) {
      props.function().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? "Loading…" : "Start Placment"}
    </Button>
  );
}
class Placement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addresses: [], //the orginals address data
      tableaddresses: [], //the address from the data to display in the table
      users: [], //the orginals userws data
      cities: [], //the list of all the cities that include in addresses
      selectedCity: "", //the city that the user select
      locations: [], //list of the cordinate of the addresses in the selected city
      group: [] //the location in groups after k-means
    };
  }

  selectChange = e => {
    var addresses = [];
    var locations = [];

    this.state.addresses.forEach((item, i) => {
      if (item.city === e.value) {
        addresses.push(item);
        locations.push(item.cordinate);
      }
      console.log(locations);
      this.setState({
        selectedCity: e.value,
        locations: locations,
        tableaddresses: addresses
      });
    });
  };

  componentDidMount = async () => {
    await fetch(`/db/ReadAll/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(addresses => {
        var cities = {};
        addresses.forEach(function(item) {
          var city = (cities[item.city] = cities[item.city] || {});
        });
        var arr = [];
        for (var i in cities) {
          arr.push(i);
        }
        this.setState({
          addresses: addresses,
          cities: arr,
          tableaddresses: addresses
        });
      });
    });

    await fetch("/usersdb/ReadAll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(users => {
        this.setState({
          users: users
        });
      });
    });
  };

  placementButtonHandle = async () => {
    var k = 0;
    for (let user of this.state.users) {
      if (!user.admin) k += 1;
    }
    var data = {
      data: this.state.locations,
      k: k
    };
    fetch("/clusterize", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      res.json().then(value => {
        console.log(value);
        var arr = [];
        var index = 0;
        for (let user of this.state.users) {
          if (!user.admin) {
            console.log("user is:    ", user);
            arr.push({user: user, locations: value[index++]});
            console.log("arr after push is:", arr);
          }
        }
        console.log("arr is   :", arr);
        this.setState({
          group: arr
        });
      });
    });
  };
  sendButtonHandle = async () => {
    this.state.group.forEach((item, i) => {
      var user = {oktaID:item.user.oktaID};
      user.locations =[];
      for (var j = 0; j < item.locations.cluster.length; j++) {
        user.locations.push(this.state.tableaddresses[item.locations.clusterInd[j]])
      }
       fetch(`/usersdb/UpdateRecord/${user.oktaID}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        window.alert(`users updated successfully`);
        this.setState({

          tableaddresses: this.state.addresses,


          selectedCity: "",
          locations: [],
          group: []
        })
      })
    });

    }
  render() {
    const columns = [
      {
        Header: "City",
        accessor: "city",
        filterable: false
      },
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
        Header: "Date",
        accessor: "date",
        filterable: false
      }
    ];

    const options = [];
    if (this.state.cities.length > 0) {
      this.state.cities.forEach((item, i) => {
        options.push({value: item, label: item});
      });
    }
    return (
      <div>
        <Container>
          <Title>Volunteer Placement</Title>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Label>choose city:</Label>
            </Col>
            <Col xs lg="3">
              <Select options={options} onChange={this.selectChange} />
            </Col>
          </Row>
          <p />
          <Container>
            <ReactTable
              data={this.state.tableaddresses}
              columns={columns}
              defaultPageSize={10}
              showPageSizeOptions={true}
              minRows={0}
            />
          </Container>
          <Row className="justify-content-md-center">
            {this.state.selectedCity ? (
              <Map
                city={this.state.selectedCity}
                locations={this.state.locations}
                group={this.state.group}
              />
            ) : (
              <div />
            )}
          </Row>
          <Row className="justify-content-md-center">
            {this.state.selectedCity ? (
              <Col>
              <LoadingButton function={this.placementButtonHandle} />
              </Col>
            ) : (
              <div />
            )}
            {this.state.group.length>0? (
              <Col>
              <Button onClick={this.sendButtonHandle }variant="success" >Accept</Button>
              </Col>
            ) : (
              <div />
            )}
          </Row>
        </Container>
        {console.log(this.state)}
        {console.log(options)}
      </div>
    );
  }
}

export default Placement;
