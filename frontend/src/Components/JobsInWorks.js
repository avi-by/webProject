import React, { Component } from 'react'
import ReactTable from 'react-table'


import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`














class JobsList extends Component {
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
              console.log("users",users);
              var arr =[];
              users.forEach((item) => {
                if (item.locations && item.locations.length>0) {
                  console.log("item","item");
                  item.locations.forEach((location) => {
                    location.volunteer=item.firstName+" "+item.lastName;
                    arr.push(location);
                  });

                }
              });
              console.log("arr",arr);
		      this.setState({
                  data: arr,
                  isLoading: false,
              })
            })
        })



    }

    render() {
        const { users, isLoading } = this.state
        const columns = [
          {
            Header: "ID",
            accessor: "id",
            filterable: true
          },
          {
            Header: "Street",
            accessor: "street",
            filterable: true
          },
          {
            Header: "Number",
            accessor: "number",
            filterable: true
          },
          {
            Header: "City",
            accessor: "city",
            filterable: true
          },
          {
            Header: "Date",
            accessor: "date",
            filterable: true
          },
          {
            Header: "Volunteer",
            accessor: "volunteer",
            filterable: true
          }

        ];




        return (
            <Wrapper>
                { (
                    <ReactTable
                        data={this.state.data}
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

export default JobsList
