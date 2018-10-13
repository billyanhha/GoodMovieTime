import React, { Component } from 'react';
import NonLoginHeader from "../components/NonLoginHeader.jsx";
import { Form, Input, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import axios from "../axios";
import { message } from 'antd';
import i18n from "../locales/i18n";
import { translate } from "react-i18next";


const FormItem = Form.Item;
class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                delete values.confimPassword;
                axios.post('/api/users', {
                    ...values
                })
                    .then(data => {
                        this.setState({ toLogin: true })
                        message.config({
                            top: '10%',
                            maxCount: 1,
                        });
                        message.loading("Creating", 1)
                            .then(message.success(i18n.t('message.createSuccess'), 1));
                    })
                    .catch(err => message.error(i18n.t('message.taken'), 1))
            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(i18n.t('message.notMatch'));
        } else {
            callback();
        }
    }

    render() {
        const { t } = this.props;

        const { getFieldDecorator } = this.props.form;
        if (this.state.toLogin) {
            return (<Redirect to="/login" />)
        }
        return (
            <div className=" container-fluid netflix">
                <div className=" contain">
                    <NonLoginHeader />
                    <div className="loginForm">
                        <div className="signUp">
                            <p className="signInText">{t('signUp.signUp')}</p>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <p className="signText" >{t('signUp.username')}</p>
                                <FormItem className="form-item-custom" >
                                    {getFieldDecorator('username', {
                                        rules: [{
                                            required: true,
                                            message: "Required"
                                        }, {
                                            pattern: new RegExp("^[a-zA-Z0-9_]{5,}[0-9]*$"),
                                            message: `${t('message.userName')}`
                                        }
                                        ],
                                    })(
                                        <Input autoFocus type="text" />
                                    )}
                                </FormItem>
                                <p className="signText" >{t('signUp.fullname')}</p>
                                <FormItem className="form-item-custom" >
                                    {getFieldDecorator('fullname', {
                                        rules: [{ required: true, message: 'Required' }, {
                                            pattern: new RegExp("^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$"),
                                            message: `${t('message.fullname')}`
                                        }],
                                    })(
                                        <Input type="text" />
                                    )}
                                </FormItem>
                                <p className="signText" >{t('signUp.password')}</p>
                                <FormItem className="form-item-custom" >
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Required' }, {
                                            pattern: new RegExp("^[a-zA-Z0-9_]{5,}[0-9]*$"),
                                            message: `${t('message.password')}`
                                        }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem >
                                <p className="signText" >{t('signUp.confirmPassword')}</p>
                                <FormItem >
                                    {getFieldDecorator('confimPassword', {
                                        rules: [{ required: true, message: 'Required' }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem>
                                <p className="signText" style={{ textAlign: 'center' }} >{t('signUp.click')}
                                    <span className="primaryColorText" >{t('signUp.term')}</span> {t('signUp.and')}
                                    <span className="primaryColorText"> {t('signUp.policy')}</span></p>
                                <FormItem className="form-item-custom" >
                                    <Button type="primary" className="myButton" htmlType="submit">
                                        <b>{t('signUp.submit')}</b>
                                    </Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const SignUp = Form.create()(SignUpForm);
export default translate()(SignUp);
