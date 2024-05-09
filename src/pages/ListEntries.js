import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import Layout from "../components/Layout"

import {
    Divider,
    Table
} from 'antd';

function PhonebookEntries() {
    const navigate = useNavigate();
    const [phonebookEntries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') === "" || localStorage.getItem('token') == null) {
            navigate("/");
        } else {
            setIsLoading(true)
            listEntries()
        }
    }, [navigate])

    const listEntries = () => {
        axios.get('/phonebook-entry', { headers: { Authorization: localStorage.getItem('token') } })
            .then((response) => {
                setEntries(response.data)
                setIsLoading(false)
            })
            .catch((e) => {
                console.log(e)
                setIsLoading(false)
            });
    }

    const handleDelete = (id) => {
        setIsLoading(true)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/phonebook-entry/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Entry deleted successfully!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        listEntries()

                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    })
                    .finally(() => {
                        setIsLoading(false)
                    });

            }
        })
    }
    return (
        <Layout>
            <div style={
                {
                    display: 'flex',
                    marginBottom: -10
                }
            }>
                <h2 style={
                    {
                        float: 'left'
                    }
                }
                >
                    Phonebook Entries List

                </h2>
            </div>

            <Divider />

            <Table
                id='phonebook-entries-table'
                rowKey={'id'}
                loading={isLoading}
                dataSource={phonebookEntries}

            >
                <Table.Column
                    title="Name"
                    dataIndex="name"
                    key="name"
                />
                <Table.Column
                    title="Date of Birth"
                    dataIndex="dateOfBirth"
                    key="dateOfBirth"
                />
                <Table.Column title="Mobile Number" dataIndex="mobileNumber" key="mobileNumber" />

                <Table.Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <span>
                            <Link to={`/edit-entry/${record.id}`}>Edit</Link>
                            <Divider type="vertical" />
                            <a href='#' onClick={() => handleDelete(record.id)}>Delete</a>
                        </span>
                    )}
                />
            </Table>

        </Layout >
    );
}

export default PhonebookEntries;