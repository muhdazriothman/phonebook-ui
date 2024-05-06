import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import Layout from "../components/Layout"

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
            .then((r) => {
                console.log(r)
                setEntries(r.data)
                setIsLoading(false)
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const handleDelete = (id) => {
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
                axios.delete(`/phonebook-entry/delete/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        listEntries()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const logoutAction = () => {
        localStorage.setItem('token', "")
        navigate("/");
    }

    return (
        <Layout>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#"></a>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a onClick={() => logoutAction()} className="nav-link " aria-current="page" href="#">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <h2 className="text-center mt-5 mb-3">Phonebook Entries</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-primary"
                                to="/create-entry"
                                disabled={isLoading} // Add disabled attribute based on isLoading state
                            >
                                Create New Entry
                            </Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Date of Birth</th>
                                        <th>Mobile Number</th>
                                        <th width="240px">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {phonebookEntries.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No entries found</td>
                                        </tr>
                                    ) : (
                                        phonebookEntries.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.dateOfBirth}</td>
                                                <td>{item.mobileNumber}</td>
                                                <td>
                                                    <Link className="btn btn-outline-success mx-1"
                                                        to={`/edit-entry/${item.id}`}>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="btn btn-outline-danger mx-1"
                                                        disabled={isLoading} // Add disabled attribute based on isLoading state
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PhonebookEntries;