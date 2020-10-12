import React, { Component } from 'react'

import Loc from "./LocationIQ";

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

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

class AddAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
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

    handleIncludeAddress = async () => {
        const { id, street, number, city, date } = this.state
        var cordinate = [];
        await Loc.search(city+" "+street+" "+number)
        .then((json) => {

            cordinate.push(json[0].lat);
            cordinate.push(json[0].lon);

        })
        const payload = { id, street, number, city, date ,cordinate}

		await fetch('/db/AddRecord',{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        window.alert(`Address inserted successfully`)
            this.setState({
                id: '',
                street: '',
                number: '',
				city: '',
				date: '',
            })
    })
    }

    render() {
      
        const { id, street, number, city, date } = this.state
        return (
            <Wrapper>
                <Title>Create Address</Title>


				<Label>ID: </Label>
                <InputText
                    type="number"
                    min="0"
                    value={id}
                    onChange={this.handleChangeInputID}
                />


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
                <Button onClick={this.handleIncludeAddress}>Add Address</Button>
                <CancelButton href={'/'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default AddAddress
