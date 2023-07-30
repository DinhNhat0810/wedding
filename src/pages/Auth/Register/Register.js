import { Breadcrumb, Form, Upload, Modal, Radio } from 'antd';
import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useBreadCrumb from '../../../hooks/useBreadCrumb';
import { breadcrumbNameMap } from '../../../utils/constant';
import { DEFAULT_AVATAR, getBase64 } from '../../../utils/common';
import ThemeInput from '../../../components/ThemeInput/ThemeInput';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';
import ThemeLoading from '../../../components/ThemeLoading/ThemeLoading';
import { register } from '../../../services/auth';
import { uploadFile } from '../../../services/uploadFile';

const cx = classNames.bind(styles);

const Register = () => {
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = async ({ fileList: newFileList }) => {
        setLoading(true);
        const formData = new FormData();
        const callback = (data) => {
            setLoading(false);
        };
        formData.append('file', newFileList[0].originFileObj);

        const res = await uploadFile(formData, callback);

        if (res) {
            setAvatar(res);
        }
        setLoading(false);
        setFileList(newFileList);
    };

    const handleSubmit = async (value) => {
        const payload = {
            username: value?.email,
            phone: value?.phoneNumber,
            fullname: value?.fullname,
            password: value?.password,
            gender: 0,
            address: '',
            avatar: avatar || DEFAULT_AVATAR,
        };
        const callback = (data) => {
            toast.error(data?.response?.data?.errorMessage);
        };

        const res = await register(payload, callback);

        if (res) {
            navigate(
                {
                    pathname: '/dang-ky/xac-thuc',
                },
                { state: { username: res.username } },
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ThemeLoading loading={loading} />
            <Helmet>
                <title>Đăng ký</title>
            </Helmet>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 8rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />
                <Form
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
                    <h1>Đăng ký tài khoản</h1>

                    <ThemeInput
                        label="Họ và tên"
                        name="fullname"
                        placeholder="Họ và tên"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền họ tên!',
                            },
                        ]}
                    />

                    <ThemeInput
                        label="Email"
                        name="email"
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

                    <ThemeInput
                        label="Số điện thoại"
                        name="phoneNumber"
                        placeholder="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                            {
                                max: 10,
                                message: 'Không được nhập quá 10 số!',
                            },
                        ]}
                        onKeyDown={(event) => {
                            const keyCode = event.keyCode || event.which;
                            if (
                                (keyCode < 48 || (keyCode > 57 && keyCode < 96) || keyCode > 105) &&
                                ![8, 9, 37, 38, 39, 40, 46].includes(keyCode)
                            ) {
                                event.preventDefault();
                            }
                        }}
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

                    <Upload
                        beforeUpload={() => false}
                        listType="picture"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        <ThemeButton content="Tải ảnh lên" icon={<UploadOutlined />}></ThemeButton>
                    </Upload>

                    <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>

                    <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
                        <ThemeButton htmlType="submit" content="Đăng ký" styles={{ width: '18rem', height: '4rem' }} />
                    </div>

                    <p>
                        Đã có tài khoản đăng nhập <Link to="/dang-nhap">tại đây</Link>
                    </p>

                    <p>
                        Có thể nói đám cưới là khởi đầu cho một chặng đường mới của các đôi uyên ương, vì thế lựa chọn
                        dịch vụ cho ngày trọng đại của cuộc đời là rất quan trọng
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Register;
