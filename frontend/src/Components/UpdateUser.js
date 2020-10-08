import React, {Component} from "react";

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: "h1"
})
``;

const Wrapper = styled.div.attrs({
  className: "form-group"
})
`
  margin: 0 30px;
`;

const Label = styled.label
`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control"
})
`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`
})
`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`
})`
  margin: 15px 15px 15px 5px;
`;

class UserUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      email: "",
      phone:""
    };
  }

  handleChangeInputFirstName = async event => {
    const firstName = event.target.value;
    this.setState({firstName});
  };

  handleChangeInputLastName = async event => {
    const lastName = event.target.validity.valid ? event.target.value : this.state.lastName;

    this.setState({lastName});
  };

  handleChangeInputEmail = async event => {
    const email = event.target.validity.valid
      ? event.target.value
      : this.state.email;

    this.setState({email});
  };

  handleChangeInputPhone = async event => {
    const phone = event.target.validity.valid
      ? event.target.value
      : this.state.phone;

    this.setState({phone});
  };


  handleUpdateUser = async () => {
    const {id, firstName,lastName,email,phone} = this.state;
    const payload = { firstName,lastName,email,phone};

    await fetch(`/usersdb/UpdateRecord/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      window.alert(`user updated successfully`);
      this.setState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone:""
      });
    });
  };

  componentDidMount = async () => {
    //const { id } = this.state
    await fetch(`/usersdb/ReadRecord/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      console.log(response);
      response.json().then(data => {
        console.log(data);
        this.setState({
          firstName: data[0].firstName,
          lastName: data[0].lastName,
          email: data[0].email,
          phone: data[0].phone
        });
      });
    });
  };

  render() {
    const { firstName,lastName,email,phone} = this.state;
    return (
      <Wrapper>
        <Title>Update User</Title>

        <Label>Frist name: </Label>
        <InputText
          type="text"
          value={firstName}
          onChange={this.handleChangeInputFirstName}
        />

        <Label>last name: </Label>
        <InputText
          type="text"
          value={lastName}
          onChange={this.handleChangeInputLastName}
        />

        <Label>Email: </Label>
        <InputText
          type="email"
          value={email}
          onChange={this.handleChangeInputEmail}
        />

        <Label>Phone: </Label>
        <InputText
          type="tel"
          value={phone}
          onChange={this.handleChangeInputPhone}
        />

        <Button onClick={this.handleUpdateUser}>Update user</Button>
        <CancelButton href={"/userlist"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default UserUpdate;
