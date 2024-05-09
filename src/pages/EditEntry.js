import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import Layout from "../components/Layout"
import {
    Button,
    DatePicker,
    Form,
    Input,
    Divider,
    Spin
} from 'antd';
import dayjs from 'dayjs';


function PhonebookEntries(props) {

    const navigate = useNavigate();
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('token') === "" || localStorage.getItem('token') == null) {
            navigate("/");
        } else {
            axios.get(`/phonebook-entry/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
                .then(function (response) {
                    let entry = response.data
                    setName(entry.name);
                    setDateOfBirth(entry.dateOfBirth);
                    setMobileNumber(entry.mobileNumber);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error)
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    }, [id, navigate])

    const onFinish = () => {
        setIsSaving(true);
        axios.put(`/phonebook-entry/${id}`, {
            name: name,
            dateOfBirth: dateOfBirth,
            mobileNumber: mobileNumber
        }, { headers: { Authorization: localStorage.getItem('token') } })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Entry updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                navigate("/list-entries");
            })
            .catch(function (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
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
                    Update Phonebook Entry

                </h2>
            </div>

            <Divider />

            {isLoading
                ? <Spin tip="Loading" size="default">

                </Spin>
                : <><Form
                    initialValues={{
                        name: name,
                        dateOfBirth: dayjs(dateOfBirth),
                        mobileNumber: mobileNumber
                    }}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 6,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 800,
                    }}
                    onFinish={onFinish}
                    disabled={isSaving}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Name is required',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dateOfBirth"
                        label="Date of Birth"
                        rules={[
                            {
                                required: true,
                                message: 'Date of Birth is required',
                            },
                        ]}
                        hasFeedback
                    >
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            contentEditable={false}
                            maxDate={dayjs(new Date())}
                        >
                        </DatePicker>
                    </Form.Item>
                    <Form.Item
                        name="mobileNumber"
                        label="Mobile Number"
                        rules={[
                            {
                                required: true,
                                message: 'Mobile Number is required',
                            },
                            {
                                pattern: new RegExp(/^[0-9\b]+$/),
                                message: 'Mobile Number must be numeric'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset: 4,
                        span: 14,
                    }}>
                        <Button type="primary" htmlType="submit" className="create-form-button">
                            Save
                        </Button>
                    </Form.Item>
                </Form></>}
        </Layout>
    );
}

export default PhonebookEntries;