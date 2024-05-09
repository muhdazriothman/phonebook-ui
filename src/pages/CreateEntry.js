import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import {
    Button,
    DatePicker,
    Form,
    Input,
    Divider
} from 'antd';
import dayjs from 'dayjs';

function PhonebookEntries() {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token') === "" || localStorage.getItem('token') == null) {
            navigate("/");
        }
    }, [navigate])

    const onFinish = (values) => {
        setIsSaving(true);
        axios.post('/phonebook-entry', {
            name: values.name,
            dateOfBirth: values.dateOfBirth,
            mobileNumber: values.mobileNumber
        }, { headers: { Authorization: localStorage.getItem('token') } })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Entry created successfully!',
                    showConfirmButton: false,
                    timer: 3000
                })
                setIsSaving(false);

                setTimeout(() => {
                    navigate("/list-entries");
                }, 3000);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 3000
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
                    Create Phonebook Entry

                </h2>
            </div>

            <Divider />

            <Form
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
            </Form>
        </Layout >
    );
}

export default PhonebookEntries;