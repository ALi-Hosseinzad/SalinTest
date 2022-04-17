import { Link } from "react-router-dom"
import useAuth from '../../global/useAuth';
import { Button } from 'antd';
import LoginLayout from "../../components/LoginLayout";

const Homepage = () => {
    const { auth } = useAuth();
    return (
        <LoginLayout>
            {auth ?
                <div className="App-card">
                    <h3 style={{ marginTop: '25%' }}>به صفحه اصلی خوش آمدید</h3>
                    <br />
                    <p>جهت مراجعه به صفحه پروفایل روی دکمه زیر کلیک کنید</p>
                    <Link to='/profile'>
                        <Button type='primary' style={{ background: "green", borderColor: "darkgreen" }} htmlType='پروفایل' shape="round" size={'large'} block >
                            ورود به صفحه پروفایل
                        </Button>
                    </Link>
                </div>
                : <div className="App-card">
                    <p style={{ marginTop: '25%' }}>شما وارد پروفایل خود نشده اید برای ورود روی دکنه زیر کلیک کنید</p>
                    <Link to='/login'>
                        <Button type='primary' style={{ background: "green", borderColor: "darkgreen" }} htmlType='ورود' shape="round" size={'large'} block >
                            ورود
                        </Button>
                    </Link>

                    <p style={{ marginTop: '50px' }}>و یا برای ثبت نام روی دکمه زیر کلیک کنید</p>
                    <Link to='/register'>
                        <Button type='primary' htmlType='ثبت نام' shape="round" size={'large'} block >
                            ثبت نام
                        </Button>
                    </Link>
                </div>
            }
        </LoginLayout>
    );
}

export default Homepage;