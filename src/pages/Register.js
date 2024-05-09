import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { Card, Form, Input, Button } from 'antd';
import Swal from 'sweetalert2'

function Register() {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (localStorage.getItem('token') !== "" && localStorage.getItem('token') != null) {
            navigate("/list-entries");
        }
    }, [navigate])

    const onFinish = (values) => {
        setIsSubmitting(true)

        let payload = {
            name: values.name,
            email: values.email,
            password: values.password
        }

        axios.post('/user', payload)
            .then((r) => {
                setIsSubmitting(false)

                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful!',
                    showConfirmButton: false,
                    timer: 5000
                })

                setTimeout(() => {
                    navigate("/");
                }, 5000)
            })
            .catch((e) => {
                if (e.response.data.message !== undefined) {
                    if (e.response.data.message.includes('name')) {
                        form.setFields([
                            {
                                name: 'name',
                                errors: [e.response.data.message],
                            },
                        ]);
                    }
                    if (e.response.data.message.includes('email')) {
                        form.setFields([
                            {
                                name: 'email',
                                errors: [e.response.data.message],
                            },
                        ]);
                    }
                    if (e.response.data.message.includes('password')) {
                        form.setFields([
                            {
                                name: 'password',
                                errors: [e.response.data.message],
                            },
                        ]);
                    }
                    if (!e.response.data.message.includes('email') && !e.response.data.message.includes('password')) {
                        setValidationErrors(e.response.data.message);
                    }
                }
                setIsSubmitting(false)
            });
    }

    return (
        <Card
            title='Register'
            style={{
                width: 500,
                margin: 'auto',
                marginTop: 100
            }}
        >
            <Form
                layout='vertical'
                form={form}
                name="register"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
                disabled={isSubmitting}

            >
                {Object.keys(validationErrors).length !== 0 &&
                    <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
                }
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Name is required',
                            whitespace: true,
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email is not valid',
                        },
                        {
                            required: true,
                            message: 'Email is required',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Password is required',
                        },
                        {
                            min: 8,
                            message: 'Password must be at least 6 characters long'
                        },
                        {
                            max: 15,
                            message: 'Password must be at most 15 characters long'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={
                        {
                            width: '100%'
                        }
                    }>
                        Register
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Link to="/" style={
                        {
                            textAlign: 'center',
                            display: 'block'
                        }

                    }>Back to login</Link>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Register;