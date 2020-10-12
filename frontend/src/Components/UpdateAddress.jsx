import React, { Component } from 'react'


import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})
``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class AddressUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            street: '',
            number: '',
			city: '',
			date: '',
        }
    }

    handleChangeInputCity = async event => {
        const city = event.target.value
        this.setState({ city })
    }

    handleChangeInputID = async event => {
        const id = event.target.validity.valid
            ? event.target.value
            : this.state.id

        this.setState({ id })
    }

	handleChangeInputNumber = async event => {
        const number = event.target.validity.valid
            ? event.target.value
            : this.state.number

        this.setState({ number })
    }

    handleChangeInputStreet = async event => {
        const street = event.target.value
        this.setState({ street })
    }

	handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    }

    handleUpdateAddress = async () => {
        const { id, street, number, city, date } = this.state
		const payload = { street, number, city, date }

		await fetch(`/db/UpdateRecord/${id}`,{
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        window.alert(`Address updated successfully`)
            this.setState({
				id: '',
                street: '',
                number: '',
				city: '',
				date: '',
            })
    })
    }

    componentDidMount = async () => {

		//const { id } = this.state
		await fetch(`/db/ReadRecord/${this.props.match.params.id}`,{
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
		}).then(response => {

				console.log(response);
			    response.json().then(
			  (data)=>{
				  console.log(data);
			  this.setState({
                  street: data[0].street,
				  number: data[0].number,
				  city: data[0].city,
				  date: data[0].date,

              })});
        })
    }






    render() {
        const { street, number, city, date } = this.state
        return (
            <Wrapper>
                <Title>Update Address</Title>


               <Label>Street: </Label>
                <InputText
                    type="text"
                    value={street}
                    onChange={this.handleChangeInputStreet}
                />

				<Label>NumberHome: </Label>
                <InputText
                    type="number"
                    min="0"
                    value={number}
                    onChange={this.handleChangeInputNumber}
                />

                <Label>city: </Label>
                <InputText
                    type="text"
                    value={city}
                    onChange={this.handleChangeInputCity}
                />

				<Label>date: </Label>
                <InputText
                    type="text"
                    value={date}
                    onChange={this.handleChangeInputDate}
                />

                <Button onClick={this.handleUpdateAddress }>Update address</Button>
                <CancelButton href={'/listOfAddresses'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default AddressUpdate
