import React, { Component } from 'react';
import './Login.css';
import NonLoginHeader from "../../components/NonLoginHeader";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom';
import axios  from "../../axios";

const FormItem = Form.Item;
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedin: false,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/api/auth/login' , {
                    ...values
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="container-fluid ">
                <div className="contain">
                    <NonLoginHeader />
                    <div className="loginForm">
                        <div className="login">
                            <p className="signInText">Sign In</p>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input  placeholder="Username" />
                                )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input  type="password" placeholder="Password" />
                                )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    <span>New to us ? </span><Link to = "./signUp">Sign up !</Link>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Login = Form.create()(LoginForm);


export default Login;
