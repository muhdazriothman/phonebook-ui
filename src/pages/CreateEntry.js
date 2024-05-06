import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate, Link, useParams } from "react-router-dom"
import Layout from "../components/Layout"

function PhonebookEntries() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token') === "" || localStorage.getItem('token') == null) {
            navigate("/");
        }
    }, [navigate])

    const handleSave = () => {
        setIsSaving(true);
        axios.post('/phonebook-entry', {
            name: name,
            dateOfBirth: dateOfBirth,
            mobileNumber: mobileNumber
        }, { headers: { Authorization: localStorage.getItem('token') } })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Entry created successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setName('')
                setDateOfBirth('')
                setMobileNumber('')
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
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
                    <h2 className="text-center mt-5 mb-3">Edit Phonebook Entry</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/list-entries">Back to List
                            </Link>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        onChange={(event) => { setName(event.target.value) }}
                                        value={name}
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input
                                        onChange={(event) => { setDateOfBirth(event.target.value) }}
                                        value={dateOfBirth}
                                        type="date"
                                        className="form-control"
                                        id="dateOfBirth"
                                        name="dateOfBirth" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobileNumber">Mobile Number</label>
                                    <input
                                        onChange={(event) => { setMobileNumber(event.target.value) }}
                                        value={mobileNumber}
                                        type="text"
                                        className="form-control"
                                        id="mobileNumber"
                                        name="mobileNumber" />
                                </div>
                                <button
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                                    className="btn btn-outline-primary mt-3">
                                    Save Entry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PhonebookEntries;