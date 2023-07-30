import { Breadcrumb, Form, Input } from 'antd';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { breadcrumbNameMap } from '../../../utils/constant';
import useBreadCrumb from '../../../hooks/useBreadCrumb';
import ThemeInput from '../../../components/ThemeInput/ThemeInput';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { login } from '../../../services/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/user/userSlice';

const cx = classNames.bind(styles);

const Login = () => {
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldsValue({
            username: location.state?.username,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const handleSubmit = async (value) => {
        const payload = {
            username: value?.username,
            password: value?.password,
        };

        const res = await login(payload);
        if (res?.status === 208) {
            toast.error(res?.data?.errorMessage);
        } else {
            dispatch(loginSuccess(res?.data));
            toast.success('Đăng nhập thành công!', { duration: 3000 });
            navigate(
                {
                    pathname: '/',
                },
                { state: { infoUser: res?.data } },
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Đăng nhập</title>
            </Helmet>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 8rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />
                <Form
                    form={form}
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{}}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                    className={cx('form')}
                >
                    <h1>Đăng nhập tài khoản</h1>

                    <ThemeInput
                        label="Email"
                        name="username"
                        placeholder="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền email!',
                            },
                        ]}
                    />

                    <ThemeInput
                        label="Mật khẩu"
                        name="password"
                        placeholder="Mật khẩu"
                        type={'password'}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    />

                    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                        <ThemeButton
                            htmlType="submit"
                            content="Đăng nhập"
                            styles={{ width: '18rem', height: '4rem' }}
                        />
                    </div>

                    <p
                        className={cx('forgot_password')}
                        onClick={() => {
                            navigate('/dang-nhap/quen-mat-khau');
                        }}
                    >
                        Quên mật khẩu
                    </p>
                    <p>
                        Chưa có tài khoản đăng ký <Link to="/dang-ky">tại đây</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;
