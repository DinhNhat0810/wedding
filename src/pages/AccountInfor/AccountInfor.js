import { Breadcrumb, Col, Form, Row, Select } from 'antd';
import styles from './AccountInfor.module.scss';
import classNames from 'classnames/bind';
import { breadcrumbNameMap, genderOptions } from '../../utils/constant';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import Slogan from '../../components/Slogan/Slogan';
import { Helmet } from 'react-helmet-async';
import { selectUser, updateUserSuccess } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import ThemeModal from '../../components/ThemeModal/ThemeModal';
import { useEffect, useState } from 'react';
import ThemeInput from '../../components/ThemeInput/ThemeInput';
import { changePassword } from '../../services/auth';
import { toast } from 'react-hot-toast';
import { updateUser } from '../../services/user';
import { EditOutlined } from '@ant-design/icons';
import { uploadFile } from '../../services/uploadFile';
import ThemeLoading from '../../components/ThemeLoading/ThemeLoading';
const cx = classNames.bind(styles);

const ChangePassword = (props) => {
    const { form } = props;

    return (
        <Form
            initialValues={{
                remember: true,
            }}
            name="ChangePassword"
            form={form}
            autoComplete="off"
        >
            <ThemeInput
                label="Mật khẩu cũ"
                name="oldPass"
                placeholder="Mật khẩu"
                type={'password'}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu cũ!',
                    },
                ]}
            />

            <ThemeInput
                label="Mật khẩu mới"
                name="newPass"
                placeholder="Mật khẩu"
                type={'password'}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                    },
                ]}
            />
        </Form>
    );
};

const ChangeInfor = (props) => {
    const { form, currentUser } = props;

    useEffect(() => {
        form.setFieldsValue({
            phone: currentUser?.user?.phone,
            fullname: currentUser?.user?.fullname,
            address: currentUser?.user?.address,
            username: currentUser?.user?.username,
            gender: currentUser?.user?.gender,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    return (
        <Form
            initialValues={{
                remember: true,
            }}
            name="ChangeInfor"
            form={form}
            autoComplete="off"
        >
            <ThemeInput label="Email" name="username" placeholder="Email" disabled={true} />

            <ThemeInput
                label="Họ tên"
                name="fullname"
                placeholder="Họ tên"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập họ tên!',
                    },
                ]}
            />

            <ThemeInput
                label="Số điện thoại"
                name="phone"
                placeholder="Số điện thoại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!',
                    },
                ]}
            />

            <ThemeInput
                label="Địa chỉ"
                name="address"
                placeholder="Địa chỉ"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập địa chỉ!',
                    },
                ]}
            />

            <Select
                defaultValue="Nam"
                style={{
                    width: '100%',
                }}
                onChange={(e) => {
                    form.setFieldsValue({ gender: e });
                }}
                options={genderOptions}
            />
        </Form>
    );
};

const AccountInfor = () => {
    const { currentUser } = useSelector(selectUser);
    const [form] = Form.useForm();
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);
    const [openChangePassModal, setOpenChangePassModal] = useState(false);
    const [openChangeInfoModal, setOpenChangeInfoModal] = useState(false);
    const [avatar, setAvatar] = useState(
        "'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1182173601.1677507032&semt=ais'",
    );
    const [loading, setLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({
        address: '',
        fullname: '',
        phone: '',
        gender: '',
        avatar: '',
    });
    const dispatch = useDispatch();

    const handleChangePassword = async () => {
        form.submit();

        try {
            const data = await form.validateFields(['oldPass', 'newPass']);

            const payload = {
                oldPass: data?.oldPass,
                newPass: data?.newPass,
            };

            const callback = (data) => {
                toast.error(data?.response?.data?.errorMessage);
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`,
                },
            };

            const res = await changePassword(payload, callback, config);
            if (res?.data) {
                setOpenChangePassModal(false);
                form.resetFields(['oldPass', 'newPass']);
                toast.success('Đổi mật khẩu thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeInfor = async () => {
        form.submit();

        try {
            const data = await form.validateFields(['address', 'phone', 'gender', 'fullname']);
            const payload = {
                address: data?.address,
                fullname: data?.fullname,
                phone: data?.phone,
                gender: data?.gender,
            };

            setDataUpdate((prev) => {
                return {
                    ...prev,
                    address: payload.address,
                    fullname: payload.fullname,
                    phone: payload.phone,
                    gender: payload.gender,
                };
            });
            setOpenChangeInfoModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setAvatar(currentUser?.user?.avatar);
    }, [currentUser]);

    const handleChangeAvatar = async (e) => {
        setLoading(true);
        const formData = new FormData();
        const callback = (data) => {
            setLoading(false);
        };
        formData.append('file', e.target.files[0]);

        const res = await uploadFile(formData, callback);

        if (res) {
            setAvatar(res);
            setDataUpdate((prev) => {
                return { ...prev, avatar: res };
            });
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        const callback = (data) => {
            toast.error(data?.response?.data?.errorMessage);
        };
        const config = {
            headers: {
                Authorization: `Bearer ${currentUser?.token}`,
            },
        };
        const res = await updateUser(currentUser?.user?.id, dataUpdate, callback, config);
        if (res) {
            toast.success('Cập nhật thành công!');
            dispatch(
                updateUserSuccess({
                    token: currentUser?.token,
                    user: res?.data,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Thông tin tài khoản</title>
            </Helmet>
            <ThemeLoading loading={loading} />

            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />

                <p className={cx('title')}>Thông tin</p>
                <Row gutter={48}>
                    <Col sm={8} md={8} xl={8} lg={8}>
                        <div className={cx('avatar')}>
                            <div>
                                <input type="file" hidden id="editAvatar" onChange={handleChangeAvatar} />
                                <img src={avatar} alt="Avatar" />

                                <label htmlFor="editAvatar">
                                    <EditOutlined onClick={() => {}} className={cx('edit-icon')} />
                                </label>
                            </div>
                            <p>Ảnh đại diện</p>
                        </div>
                    </Col>
                    <Col sm={16} md={16} xl={16} lg={16}>
                        <div className={cx('submit')}>
                            <ThemeButton content="Lưu thay đổi" onClick={handleSubmit} />
                        </div>
                        <div className={cx('infor')}>
                            <div>
                                <p>Email: {currentUser?.user?.username} </p>
                                <p>Họ tên: {currentUser?.user?.fullname} </p>
                                <p>Số điện thoại: {currentUser?.user?.phone} </p>
                                <p>Giới tính: {currentUser?.user?.gender === 0 ? 'Nam' : 'Nữ'} </p>
                                <p>Địa chỉ: {currentUser?.user?.address} </p>

                                <div>
                                    <ThemeButton content="Đổi mật khẩu" onClick={() => setOpenChangePassModal(true)} />
                                </div>
                                <div>
                                    <ThemeButton content="Sửa thông tin" onClick={() => setOpenChangeInfoModal(true)} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <ThemeModal
                    centered={true}
                    title="Đổi mật khẩu"
                    onCancel={() => setOpenChangePassModal(false)}
                    open={openChangePassModal}
                    contents={<ChangePassword form={form} />}
                    onOk={() => handleChangePassword()}
                    cancelText="Hủy"
                    okText="Thay đổi"
                    style={{ top: '-20%' }}
                />

                <ThemeModal
                    centered={true}
                    title="Sửa thông tin"
                    onCancel={() => setOpenChangeInfoModal(false)}
                    open={openChangeInfoModal}
                    onOk={() => handleChangeInfor()}
                    contents={<ChangeInfor form={form} currentUser={currentUser} />}
                    cancelText="Hủy"
                    okText="Xác nhận"
                    style={{ top: '-20%' }}
                />

                <Slogan />
            </div>
        </div>
    );
};

export default AccountInfor;
