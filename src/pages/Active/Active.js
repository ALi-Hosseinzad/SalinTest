import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import queryString from 'query-string';
import { Form, Input, Button, Typography } from 'antd';
import apiService, { errorResponse } from '../../api/apiService';
import endpointUrls from '../../api/endpointUrls';
import { setNotificationData } from '../../redux/reducer/Toast/toastReducer';
import useApiCatcher from '../../global/useApiCatcher';
import FormWrapper from '../../components/FormWrapper';
import FormItem from '../../components/FormItem';
import Layout from '../../components/LoginLayout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { convertPersianNumberToEnglish } from '../../global/convert';
import useAuth from '../../global/useAuth';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
    const { setAuth } = useAuth();
    const token = cookie.get('token');
    const dispatch = useDispatch();
    const apiCatcher = useApiCatcher();
    const location = useLocation()
    const [queryParam] = useState(queryString.parse(location.search));
    let navigate = useNavigate();
    const [state, setState] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values) => {
        setIsLoading(true);
        apiService.post(endpointUrls.active + `?phone=${queryParam.phone}&code=${convertPersianNumberToEnglish(values.code)}&token=${token}`)
            .then((data) => {
                if (data.ok) {
                    dispatch(setNotificationData({ message: 'شما با موفقیت ثبت نام کردید', type: 'success', time: 5000 }));
                    navigate('/profile')
                    cookie.set("auth", true)
                    setAuth(true);
                } else {
                    dispatch(setNotificationData({ message: 'ثبت نام شما به درستی انجام نپذیرفت', type: 'error', time: 5000 }));
                    setState(true)
                }
                setIsLoading(false);
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
            <Title level={3}>خوش آمدید به صفحه فعال سازی کد دریافتی</Title>
            <br />
            <Form name='login' onFinish={onFinish} layout="vertical">
                <FormWrapper singleColumn>
                    <FormItem
                        label='کد ارسالی'
                        name='code'
                        rules={[
                            {
                                required: true,
                                message: 'کد دریافتی خود را وارد کنید',
                            },
                            {
                                min: '6',
                                message: 'کد دریافتی باید بیشتر از 6 کاراکتر باشد',
                            },
                            {
                                whitespace: true,
                                message: 'کددریافتی نمی‌تواند شامل فاصله باشد',
                            },
                            {
                                pattern: /[0-9۰-۹]$/,
                                message: 'کددریافتی فقط شامل اعداد می‌باشد',
                            },
                        ]}>
                        <Input size="large" style={{ borderRadius: '20px' }} />
                    </FormItem>

                    <FormItem button>
                        <Button type='primary' htmlType='فعال سازی' shape="round" size={'large'} block loading={isLoading}>
                            فعال سازی
                        </Button>
                    </FormItem>
                </FormWrapper>
            </Form>
            {state && (<div>
                <Link to='/'>
                    بازگشت به صفحه اصلی
                </Link>
            </div>)}
        </Layout >
    );
};

export default Login;
