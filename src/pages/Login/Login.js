import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import { Form, Input, Button, Typography, Checkbox } from 'antd';
import apiService, { errorResponse } from '../../api/apiService';
import endpointUrls from '../../api/endpointUrls';
import { setNotificationData } from '../../redux/reducer/Toast/toastReducer';
import useApiCatcher from '../../global/useApiCatcher';
import FormWrapper from '../../components/FormWrapper';
import FormItem from '../../components/FormItem';
import Layout from '../../components/LoginLayout';
import { GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputPhoneNumber from '../../components/InputPhoneNumber';
import { convertPersianNumberToEnglish } from '../../global/convert';
import useAuth from '../../global/useAuth';


const { Title } = Typography;
const Login = () => {
    const { setAuth } = useAuth();
    const dispatch = useDispatch();
    const apiCatcher = useApiCatcher();
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values) => {
        setIsLoading(true);
        apiService.post(endpointUrls.login + `?phone=09${convertPersianNumberToEnglish(values.phone)}&password=${values.password}`)
            .then((data) => {
                if (data.ok) {
                    cookie.set('token', data.token);
                    cookie.set('auth', true);
                    dispatch(setNotificationData({ message: 'شما با موفقیت وارد شدید', type: 'success', time: 5000 }));
                    setAuth(true)
                    navigate('/profile')
                } else {
                    dispatch(setNotificationData({ message: 'شماره تماس یا پسورد اشتباه هست', type: 'error', time: 5000 }));
                }
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                apiCatcher(errorResponse);
            });
    };
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    return (
        <Layout>
            <Link to='/'>
                <div className='App-logo'>
                    <img alt="logo" src='salin-logo3.png' width='300' />
                </div>
            </Link>
            <Title level={3}>خوش آمدید به صفحه ورود</Title>
            <Title level={5}>با ورود به سایت پروفایل خود را ارتقا بدهبد</Title>
            <br />
            <Button shape="round" size={'large'} block>
                ورود با گوگل
                <GoogleOutlined />
            </Button>
            <div className="separator">یا ورود با موبایل</div>

            <Form name='login' onFinish={onFinish} layout="vertical">
                <FormWrapper singleColumn>

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
                                message: 'پسورد باید بیشتر از 6 کاراکتر باشد',
                            },
                        ]}>
                        <Input.Password size="large" style={{ borderRadius: '20px' }} />
                    </FormItem>
                    <div className='App-wrapper' >
                        <Checkbox onChange={onChange}>مرا به خاطر بسپار</Checkbox>
                        <Link to='/forgot-password'>
                            <Button type="link">فراموش رمز</Button>
                        </Link>
                    </div>

                    <FormItem button>
                        <Button type='primary' htmlType='ورود' shape="round" size={'large'} block loading={isLoading}>
                            ورود
                        </Button>
                    </FormItem>
                </FormWrapper>
            </Form>
            <div>
                اگر هنوز ثبت نام نکردید؟
                <Link to='/register'>
                    <Button type="link">ثبت‌نام</Button>
                </Link>
            </div>
        </Layout >
    );
};

export default Login;
