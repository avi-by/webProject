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



class UpdateUser extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/userlist/update/${this.props.id}`
    }




    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteUser extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the user ${this.props.id} permanently?`,
            )
        ) {
            fetch(`/usersdb/DeleteRecord/${this.props.id}`,{
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











class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({

              isLoading: true,
          });

	    await fetch('/usersdb/ReadAll',{
            method: "GET",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(response => {
            response.json().then(users =>{
		      this.setState({
                  users: users,
                  isLoading: false,
              })
            })
        })



    }

    render() {
        const { users, isLoading } = this.state

        const columns = [
          {
                    Header: 'ID',
                    accessor: 'id',
                    filterable: true,
                },
			{
                Header: 'First Name',
                accessor: 'firstName',
                filterable: true,
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                filterable: true,
            },
            {
                Header: 'Gender',
                accessor: 'gender',
                filterable: false,
            },
            {
                Header: 'Email',
                accessor: 'email',
                filterable: true,
            },{
                Header: 'Phone',
                accessor: 'phone',
                filterable: true,
            },{
                id: 'admin',
                Header: 'Admin',
                accessor: user => user.admin ? 'yes' : 'no',
                filterable: true,
            },
			{
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteUser id={props.original.oktaID} />
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
                            <UpdateUser id={props.original.oktaID} />
                        </span>
                    )
                },
            },
        ]



        return (
            <Wrapper>
                { (
                    <ReactTable
                        data={users}
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

export default UserList
