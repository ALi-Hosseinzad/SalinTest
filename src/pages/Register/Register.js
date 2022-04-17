import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import { Form, Input, Button, Typography } from 'antd';
import apiService, { errorResponse } from '../../api/apiService';
import endpointUrls from '../../api/endpointUrls';
import { setNotificationData } from '../../redux/reducer/Toast/toastReducer';
import useApiCatcher from '../../global/useApiCatcher';
import FormWrapper from '../../components/FormWrapper';
import FormItem from '../../components/FormItem';
import Layout from '../../components/LoginLayout';
import queryString from 'query-string';
import { useNavigate, Link } from 'react-router-dom';
import { convertPersianNumberToEnglish } from '../../global/convert';
import InputPhoneNumber from '../../components/InputPhoneNumber';

const { Title } = Typography;

const Register = () => {
    const dispatch = useDispatch();
    const apiCatcher = useApiCatcher();
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values) => {

        setIsLoading(true);
        apiService.post(endpointUrls.register + `?phone=09${convertPersianNumberToEnglish(values.phone)}&firstname=${values.firstname}&lastname=${values.lastname}&password=${values.password}`)
            .then((data) => {
                if (data.ok) {
                    setIsLoading(false);
                    cookie.set('token', data.token);
                    dispatch(setNotificationData({ message: 'کد پیامک شده را وارد کنید', type: 'success', time: 5000 }));
                    navigate({
                        pathname: "/active",
                        search: queryString.stringify({ phone: `09${convertPersianNumberToEnglish(values.phone)}` })
                    });
                } else {
                    dispatch(setNotificationData({ message: 'عملیات موفقیت آمیز نبود', type: 'error', time: 5000 }));
                }
            })
            .catch(() => {
                setIsLoading(false);
                apiCatcher(errorResponse);
            });
    };

    return (
        <Layout>
            <Link to='/'>
                <div className='App-logo'>
                    <img alt="logo" src='salin-logo3.png' width='300' />
                </div>
            </Link>
            <Title level={3}>خوش آمدید به صفحه ثبت‌نام</Title>
            <br />
            <Form name='login' onFinish={onFinish} layout="vertical">
                <FormWrapper singleColumn>
                    <FormItem
                        label='نام'
                        name='firstname'
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'نام خود را وارد کنید',
                            },
                            {
                                pattern: /^[\u0600-\u06FF\uFB8A\u067E\u06AF\u200C\u200F\s-]+$/,
                                message: 'نام فقط شامل حروف فارسی می تواند باشد',
                            },
                        ]}>
                        <Input placeholder='نام' size="large" style={{ borderRadius: '20px' }} />
                    </FormItem>
                    <FormItem
                        className=''
                        label='نام خانوادگی'
                        hasFeedback
                        name='lastname'
                        rules={[
                            {
                                required: true,
                                message: 'نام خانوادگی خود را وارد کنید',
                            },
                            {
                                pattern: /^[\u0600-\u06FF\uFB8A\u067E\u06AF\u200C\u200F\s-]+$/,
                                message: 'نام خانوادگی فقط شامل حروف فارسی می تواند باشد',
                            },
                        ]}>
                        <Input placeholder='نام خانوادگی' size="large" style={{ borderRadius: '20px' }} />
                    </FormItem>
                    <InputPhoneNumber />
                    <FormItem
                        label='پسورد'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'پسورد خود را وارد کنید',
                            },
                            {
                                min: '6',
                                message: 'رمز عبور باید بیشتر از 6 کاراکتر باشد',
                            },
                        ]}>
                        <Input.Password size="large" style={{ borderRadius: '20px' }} />
                    </FormItem>

                    <FormItem button>
                        <Button type='primary' htmlType='ورود' shape="round" size={'large'} block loading={isLoading}>
                            ثبت نام
                        </Button>
                    </FormItem>
                </FormWrapper>
            </Form>

        </Layout >
    );
};

export default Register;
