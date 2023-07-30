import { Breadcrumb, Form } from 'antd';
import styles from './ResetPassword.module.scss';
import classNames from 'classnames/bind';
import { breadcrumbNameMap } from '../../../utils/constant';
import useBreadCrumb from '../../../hooks/useBreadCrumb';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import ThemeInput from '../../../components/ThemeInput/ThemeInput';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { resetPassword } from '../../../services/auth';

const cx = classNames.bind(styles);

const ResetPassword = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const location = useLocation();
    const pathSnippets = location.pathname;
    breadcrumbNameMap[pathSnippets] = 'Quên mật khẩu';
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);

    const handleSubmit = async (value) => {
        const payload = {
            username: value?.username,
        };
        const callback = (data) => {
            toast.error(data?.response?.data?.errorMessage);
        };
        const res = await resetPassword(payload?.username, callback);

        if (res) {
            toast.success('Mật khẩu đã được gửi về địa chỉ email của bạn!', { duration: 3000 });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Quên mật khẩu</title>
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
                    <h1>Quên mật khẩu</h1>

                    <ThemeInput
                        label="Email"
                        name="username"
                        placeholder="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },

                            {
                                type: 'email',
                                message: 'Vui lòng nhập đúng định dạng email!',
                            },
                        ]}
                    />

                    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                        <ThemeButton htmlType="submit" content="Xác nhận" styles={{ width: '18rem', height: '4rem' }} />
                    </div>

                    <p>
                        Có thể nói đám cưới là khởi đầu cho một chặng đường mới của các đôi uyên ương, vì thế lựa chọn
                        dịch vụ cho ngày trọng đại của cuộc đời là rất quan trọng
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;
