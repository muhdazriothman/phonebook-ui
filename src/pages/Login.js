import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (localStorage.getItem('token') !== "" && localStorage.getItem('token') != null) {
            navigate("/list-entries");
        }
        console.log(localStorage.getItem('token'))
    }, [navigate])

    const onFinish = (values) => {
        setIsSubmitting(true)
        let payload = {
            email: values.email,
            password: values.password,
        }
        axios.post('/login', payload)
            .then((r) => {
                setIsSubmitting(false)
                localStorage.setItem('token', r.data.token)
                navigate("/list-entries");
            })
            .catch((e) => {
                if (e.response.data.message !== undefined) {
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
        <Form
            form={form}
            style={{ width: '300px', margin: 'auto', marginTop: '100px' }}
            name="normal_login"
            className="login-form"
            disabled={isSubmitting}
            onFinish={onFinish}
        >
            {Object.keys(validationErrors).length !== 0 &&
                <p className='text-center '><small className='text-danger'>Incorrect Email or Password</small></p>
            }
            <Form.Item
                name="email"
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
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Password is required',
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                {' '}
                Or
                {' '}
                {
                    isSubmitting
                        ? <Link to="#">Create an account now!</Link>
                        : <Link to="/register">Create an account now!</Link>
                }
            </Form.Item>
        </Form>
    );
};
export default Login;