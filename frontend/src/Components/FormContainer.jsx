import React, {Component} from "react";

/* Import Components */
import Input from "./formComponents/Input";
import CheckBox from "./formComponents/CheckBox";
import Select from "./formComponents/Select";
import Button from "./formComponents/Button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        id: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phone: "",
        admin: false,
        password: "aA!123456789"
      },

      genderOptions: ["Male", "Female"]
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */

  handleCheckBox(e) {
    console.log(e.target);
    let value = e.target.checked;
    let name = e.target.name;
    this.setState(prevState => ({
      newUser: {...prevState.newUser, [name]: value}
    }));
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
      newUser: {...prevState.newUser, [name]: value}
    }));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch("/adduser", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json();
        console.log(response);

          console.log(response);
          if (response.status >= 200 && response.status< 300) {
            alert("User added successfully");
    this.setState({
                newUser: {
                  id:'',
                  firstName: '',
                  lastName:'',
                  gender: '',
                  email:'',
                  phone:'',
                  admin:false,
                  password:'aA!123456789'
                },
              });
          } else {
          alert(response.statusText);
          }
        }
        //alert("User added successfully");
        /*this.setState({
            newUser: {
              id:'',
              firstName: '',
              lastName:'',
              gender: '',
              email:'',
              phone:'',
              admin:false,
              password:'aA!123456789'
            },
          });*/
      )
      .catch(response => {
        alert('error');
      });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      newUser: {
        id: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phone: "",
        admin: false,
        password: "aA!123456789"
      }
    });
  }

  render() {
    console.log(this.state.newUser);
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <Input
          inputType={"text"}
          title={"ID"}
          name={"id"}
          value={this.state.newUser.id}
          placeholder={"Enter your ID number"}
          handleChange={this.handleInput}
        />{" "}
        {/* ID of the user */}
        <Input
          inputType={"text"}
          title={"First Name"}
          name={"firstName"}
          value={this.state.newUser.firstName}
          placeholder={"Enter your first name"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"text"}
          title={"Last Name"}
          name={"lastName"}
          value={this.state.newUser.lastName}
          placeholder={"Enter your last name"}
          handleChange={this.handleInput}
        />{" "}
        {/* Last Name of the user */}
        <Select
          title={"Gender"}
          name={"gender"}
          options={this.state.genderOptions}
          value={this.state.newUser.gender}
          placeholder={"Select Gender"}
          handleChange={this.handleInput}
        />{" "}
        {/* Gendr Selection */}
        <Input
          inputType={"email"}
          title={"email"}
          name={"email"}
          value={this.state.newUser.email}
          placeholder={"Enter your email"}
          handleChange={this.handleInput}
        />{" "}
        {/* Email of the user */}
        <Input
          inputType={"tel"}
          title={"Phone number"}
          name={"phone"}
          value={this.state.newUser.phone}
          placeholder={"Enter your phone number"}
          handleChange={this.handleInput}
        />{" "}
        {/* phone number of the user */}
        <CheckBox
          title={""}
          name="admin"
          handleChange={this.handleCheckBox}
          value={"Is Admin"}
          checked={this.state.newUser.admin}
        />
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Clear"}
          style={buttonStyle}
        />{" "}
        {/* Clear the form */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
