import React, { Component } from 'react'
import ReactTable from 'react-table'


import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`


const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`



class UpdateAddress extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/addresses/update/${this.props.id}`
    }




    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteAddress extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the address ${this.props.id} permanently?`,
            )
        ) {
            fetch(`/db/DeleteRecord/${this.props.id}`,{
				method: "DELETE",
				headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'
				},
				}).then(response => {
					response.json().then(data =>{
					console.log("Successful" + data);
				})
			})
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}











class AddressList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addresses: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        /**this.setState({ isLoading: true })

        await api.getAllRecords().then(movies => {
            this.setState({
                addresses: movies.data.data,
                isLoading: false,
            })
        })**/

	    await fetch('/db/ReadAll',{
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {
            response.json().then(addresses =>{
		      this.setState({
                  addresses: addresses,
                  isLoading: false,
              })
            })
        })



    }

    render() {
        const { addresses, isLoading } = this.state
        //console.log('TCL: MoviesList -> render -> movies', addresses)

        const columns = [
            {
                Header: 'ID',
                accessor: 'id',
                filterable: true,
            },
			{
                Header: 'Street',
                accessor: 'street',
                filterable: true,
            },
            {
                Header: 'Number',
                accessor: 'number',
                filterable: true,
            },
            {
                Header: 'City',
                accessor: 'city',
                filterable: true,
            },
            {
                Header: 'Date',
                accessor: 'date',
                filterable: true,
            },
			{
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteAddress id={props.original.id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateAddress id={props.original.id} />
                        </span>
                    )
                },
            },
        ]



        return (
            <Wrapper>
                { (
                    <ReactTable
                        data={addresses}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default AddressList
