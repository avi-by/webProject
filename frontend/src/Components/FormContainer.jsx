import React, {Component} from 'react';

/* Import Components */
import CheckBox from './formComponents/CheckBox';
import Input from './formComponents/Input';
import TextArea from './formComponents/TextArea';
import Select from './formComponents/Select';
import Button from './formComponents/Button'

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        id:'',
        name: '',
        gender: '',
        email:''
      },

      genderOptions: ['Male', 'Female'],

    }


    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);

    this.handleInput = this.handleInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */




  handleInput(e) {
       let value = e.target.value;
       let name = e.target.name;
   this.setState( prevState => ({ newUser :
        {...prevState.newUser, [name]: value
        }
      }), () => console.log(this.state.newUser))
  }



  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch('/db/AddRecord',{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    })
  }

  handleClearForm(e) {

      e.preventDefault();
      this.setState({
        newUser: {
          id:'',
          name: '',
          gender: '',
          email:''
        },
      })
  }

  render() {
    return (

        <form className="container-fluid" onSubmit={this.handleFormSubmit}>

            <Input inputType={'text'}
                   title= {'ID'}
                   name= {'id'}
                   value={this.state.newUser.id}
                   placeholder = {'Enter your ID number'}
                   handleChange = {this.handleInput}
                   /> {/* ID of the user */}

            <Input inputType={'text'}
                   title= {'Full Name'}
                   name= {'name'}
                   value={this.state.newUser.name}
                   placeholder = {'Enter your name'}
                   handleChange = {this.handleInput}

                   /> {/* Name of the user */}



          <Select title={'Gender'}
                  name={'gender'}
                  options = {this.state.genderOptions}
                  value = {this.state.newUser.gender}
                  placeholder = {'Select Gender'}
                  handleChange = {this.handleInput}
                  /> {/* Gendr Selection */}

          <Input inputType={'email'}
                 title= {'email'}
                 name= {'email'}
                 value={this.state.newUser.email}
                 placeholder = {'Enter your email'}
                 handleChange = {this.handleInput}

                 /> {/* Email of the user */}

          <Button
              action = {this.handleFormSubmit}
              type = {'primary'}
              title = {'Submit'}
            style={buttonStyle}
          /> { /*Submit */ }

          <Button
            action = {this.handleClearForm}
            type = {'secondary'}
            title = {'Clear'}
            style={buttonStyle}
          /> {/* Clear the form */}

        </form>

    );
  }
}

const buttonStyle = {
  margin : '10px 10px 10px 10px'
}

export default FormContainer;
