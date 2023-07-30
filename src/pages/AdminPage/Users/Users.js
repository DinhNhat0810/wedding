import { Breadcrumb, Col, Form, Row, Image as ImageTag, Input, Image, Select, Switch } from 'antd';
import styles from './Users.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ThemeTable from '../../../components/ThemeTable/ThemeTable';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
    addCategoryByAdmin,
    deleteCategoryByAdmin,
    getCategoriesByAdminOrManager,
    updateCategoryByAdmin,
} from '../../../services/category';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/userSlice';
import { toast } from 'react-hot-toast';
import ThemeModal from '../../../components/ThemeModal/ThemeModal';
import ThemeInput from '../../../components/ThemeInput/ThemeInput';
import UploadImage from '../../../components/UploadImage/UploadImage';
import { changeStatusAccount, createUserByAdmin, getUserByRole, updateUser } from '../../../services/user';
import { ROLES, genderOptions } from '../../../utils/constant';
import images from '../../../assets/images';
import { changePassword } from '../../../services/auth';

const cx = classNames.bind(styles);

const inputFields = [
    {
        label: 'Email',
        field: 'username',
        type: 'string',
    },
    {
        label: 'Họ tên',
        field: 'fullname',
        type: 'string',
    },
    {
        label: 'Mật khẩu',
        field: 'password',
        type: 'string',
    },
    {
        label: 'Số điện thoại',
        field: 'phone',
        type: 'string',
    },
    {
        label: 'Địa chỉ',
        field: 'address',
        type: 'string',
    },
    {
        label: 'Giới tính',
        field: 'gender',
        type: 'dropdown',
        option: genderOptions,
    },
    {
        label: 'Phân quyền',
        field: 'role',
        type: 'dropdown',
        option: ROLES?.filter((item) => !['ROLE_USER', 'ROLE_PARTNER'].includes(item?.name)),
        mode: 'multiple',
    },
    {
        label: 'Hình ảnh',
        field: 'avatar',
        type: 'file',
    },
];

const inputPassFields = [
    {
        label: 'Mật khẩu cũ',
        field: 'oldPass',
        type: 'string',
    },
    {
        label: 'Mật khẩu mới',
        field: 'newPass',
        type: 'string',
    },
];

const UserForm = (props) => {
    const { form, onSetData, dataForm, isEdit } = props;

    const [picture, setPicture] = useState('');

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                username: dataForm?.username,
                fullname: dataForm?.fullname,
                password: dataForm?.password,
                phone: dataForm?.phone,
                gender: dataForm?.gender,
                address: dataForm?.address,
                role: dataForm?.role,
            });
        }
        setPicture(dataForm?.avatar);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataForm]);

    return (
        <Form
            initialValues={{
                remember: true,
            }}
            name="userForm"
            form={form}
            autoComplete="off"
        >
            <Row gutter={24}>
                {' '}
                {inputFields?.map((item, index) => {
                    if (item.type === 'string') {
                        return (
                            <Col key={index} lg={12} md={12} xl={12}>
                                <ThemeInput
                                    key={index}
                                    disabled={isEdit && item?.field === 'password' ? true : false}
                                    label={item?.label}
                                    name={item?.field}
                                    placeholder={item?.label}
                                    rules={[
                                        {
                                            required: item?.required,
                                            message: 'Vui lòng điền vào trường này!',
                                        },
                                    ]}
                                    onChange={(e) => {
                                        onSetData((prev) => {
                                            return {
                                                ...prev,
                                                [item?.field]: e.target.value,
                                            };
                                        });
                                    }}
                                />
                            </Col>
                        );
                    }

                    if (item.type === 'dropdown') {
                        return (
                            <Col key={index} lg={12} md={12} xl={12}>
                                {' '}
                                <ThemeInput
                                    key={index}
                                    label={item?.label}
                                    name={item?.field}
                                    placeholder={item?.label}
                                    option={item?.option}
                                    type="dropdown"
                                    selectMode={item?.mode}
                                    // rules={[
                                    //     {
                                    //         required: item?.required,
                                    //         message: 'Vui lòng điền vào trường này!',
                                    //     },
                                    // ]}
                                    onChange={(e) => {
                                        onSetData((prev) => {
                                            return {
                                                ...prev,
                                                [item?.field]: e,
                                            };
                                        });
                                    }}
                                />
                            </Col>
                        );
                    }

                    if (item.type === 'file') {
                        return (
                            <Col key={index} lg={12} md={12} xl={12}>
                                <div key={index} style={{ margin: '2rem 0' }}>
                                    <UploadImage
                                        showUploadList={false}
                                        onGetImage={(data) => {
                                            onSetData((prev) => {
                                                return {
                                                    ...prev,
                                                    [item?.field]: data,
                                                };
                                            });
                                        }}
                                    />
                                </div>
                                {picture && (
                                    <div style={{ marginBottom: '2rem' }}>
                                        <Image
                                            src={picture}
                                            width={100}
                                            height={100}
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </div>
                                )}
                            </Col>
                        );
                    }
                })}
            </Row>
        </Form>
    );
};

const ChangePassModal = (props) => {
    const { form, onSetData } = props;

    return (
        <Form
            initialValues={{
                remember: true,
            }}
            name="changePassword"
            form={form}
            autoComplete="off"
        >
            {inputPassFields?.map((item, index) => {
                if (item.type === 'string') {
                    return (
                        <ThemeInput
                            key={index}
                            label={item?.label}
                            name={item?.field}
                            placeholder={item?.label}
                            rules={[
                                {
                                    required: item?.required,
                                    message: 'Vui lòng điền vào trường này!',
                                },
                            ]}
                            onChange={(e) => {
                                onSetData((prev) => {
                                    return {
                                        ...prev,
                                        [item?.field]: e.target.value,
                                    };
                                });
                            }}
                        />
                    );
                }
            })}
        </Form>
    );
};

const Users = () => {
    const { currentUser } = useSelector(selectUser);
    const [dataSource, setDataSource] = useState(null);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openChangePassModal, setOpenChangePassModal] = useState(false);
    const [activePagation, setActivePagination] = useState(1);
    const [form] = Form.useForm();
    const [dataForm, setDataForm] = useState({
        username: '',
        fullname: '',
        password: '',
        phone: '',
        gender: '',
        avatar: '',
        address: '',
        role: '',
        oldPass: '',
        newPass: '',
    });
    const [titleModal, setTitleModal] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [idRecord, setIdRecord] = useState(null);

    const handlePaginationChange = (page) => {
        getData(page - 1);
        setActivePagination(page);
    };

    const showModal = (title, record) => {
        if (record) {
            setIsEdit(true);
            setDataForm({
                username: record?.username,
                fullname: record?.fullname,
                password: record?.password,
                phone: record?.phone,
                gender: record?.gender,
                address: record?.address,
                role: record?.authorities?.map((item) => item?.name),
                avatar: record?.avatar,
                id: record?.id,
            });
        } else {
            setIsEdit(false);
        }

        setTitleModal(title);
        setOpenModalUser(true);
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'username',
            key: 'username',
            width: 100,
            // filters: ROLES?.map((item) => {
            //     return {
            //         text: item?.label,
            //         value: item?.value,
            //     };
            // }),
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            // sorter: true,
        },
        {
            title: 'Quyền',
            dataIndex: 'authorities',
            key: 'authorities',
            render: (data) => (
                <div>
                    {data?.map((item, index) => (
                        <p key={index}>{item?.name}</p>
                    ))}
                </div>
            ),
            // sorter: true,
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            // sorter: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            // sorter: true,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            // sorter: true,
            render: (text) => (text === 0 ? 'Nam ' : 'Nữ'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            // sorter: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'actived',
            key: 'actived',
            render: (_, record) => {
                return (
                    <Switch
                        defaultChecked
                        onChange={() => {
                            handleChangeStatusAccount(record?.id);
                        }}
                        checked={record?.actived}
                    />
                );
            },
            // sorter: true,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => {
                return <img width={40} height={40} src={text} alt="" />;
            },
            // sorter: true,
        },

        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <div className={cx('action')}>
                    <EditOutlined
                        style={{ fontSize: '2rem', marginRight: '1rem', color: ' green' }}
                        onClick={() => showModal('Chỉnh sửa', record)}
                    />
                    {/* <DeleteOutlined
                        style={{ fontSize: '2rem', marginRight: '1rem', color: ' red' }}
                        onClick={() => {
                            setIdRecord(record?.id);
                            setOpenConfirmModal(true);
                        }}
                    /> */}
                    {/* 
                    <img
                        onClick={() => setOpenChangePassModal(true)}
                        src={images?.changePassIcon}
                        alt=""
                        style={{ width: 20, height: 20 }}
                    /> */}
                </div>
            ),
        },
    ];

    const handleChangeStatusAccount = async (id) => {
        const callback = (data) => {
            toast.error(data?.response?.data?.errorMessage);
        };
        const payload = {
            id: id,
        };

        const res = await changeStatusAccount(payload, callback);

        if (res?.status === 208) {
            toast.error(res?.data?.errorMessage);
        } else {
            toast.success('Thành công!');
            getData();
        }
    };

    const handleDelete = async () => {
        const callback = (data) => {
            toast.error(data?.response?.data?.errorMessage);
        };

        const res = await deleteCategoryByAdmin(idRecord, callback);
        if (res) {
            setOpenConfirmModal(false);
            getData();
            toast.success('Thành công!');
        }
    };

    const getData = async (page) => {
        const callback = (data) => {
            toast.error(data?.response?.data?.errorMessage);
        };

        const payload = {
            role: '',
            page: page || 0,
            size: 10,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${currentUser?.token}`,
            },
        };

        const res = await getUserByRole(payload, callback, config);

        if (res?.content) {
            setDataSource(res);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async () => {
        form.submit();

        try {
            await form.validateFields();

            const payload = {
                username: dataForm?.username,
                fullname: dataForm?.fullname,
                password: dataForm?.password,
                phone: dataForm?.phone,
                gender: dataForm?.gender,
                avatar: dataForm?.avatar,
                address: dataForm?.address,
                authorities: dataForm?.role?.map((item) => {
                    return {
                        name: item,
                    };
                }),
            };

            let res;

            if (isEdit) {
                res = await updateUser(dataForm?.id, payload);
            } else {
                res = await createUserByAdmin(payload);
            }

            if (res?.status === 208) {
                toast.error(res?.data?.errorMessage);
            } else {
                setOpenModalUser(false);
                form.resetFields();
                setDataForm({
                    username: '',
                    fullname: '',
                    password: '',
                    phone: '',
                    gender: '',
                    avatar: '',
                    address: '',
                    role: '',
                });
                toast.success('Thành công!');
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePass = async () => {
        form.submit();

        try {
            await form.validateFields();

            const payload = {
                oldPass: dataForm?.oldPass,
                newPass: dataForm?.newPass,
            };

            console.log(payload);

            // const callback = (data) => {
            //     toast.error(data?.response?.data?.errorMessage);
            // };

            //    const res = await changePassword( payload, callback);

            // if (res?.data) {
            //     setOpenModalUser(false);
            //     form.resetFields();
            //     setDataForm({
            //         username: '',
            //         fullname: '',
            //         password: '',
            //         phone: '',
            //         gender: '',
            //         avatar: '',
            //         address: '',
            //         role: '',
            //     });
            //     toast.success('Thành công!');
            //     getData();
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Quản lý người dùng</title>
            </Helmet>

            <div className={cx('table')}>
                <div className={cx('table_title')}>
                    <p>Quản lý người dùng</p>
                    <div>
                        <ThemeButton
                            onClick={() => showModal('Thêm mới')}
                            content="Thêm mới"
                            styles={{ backgroundColor: '#001529' }}
                        />
                    </div>
                </div>

                <ThemeTable
                    columns={columns}
                    scroll={{
                        x: 'max-content',
                    }}
                    dataSource={dataSource && dataSource?.content}
                    totalDocs={dataSource && dataSource?.totalElements}
                    pageSize={dataSource && dataSource?.size}
                    activePagation={activePagation}
                    handlePaginationChange={handlePaginationChange}
                    pagination={true}
                />
            </div>

            <ThemeModal
                centered={true}
                title={titleModal}
                onCancel={() => {
                    form.resetFields();
                    setDataForm({
                        username: '',
                        fullname: '',
                        password: '',
                        phone: '',
                        gender: '',
                        avatar: '',
                        address: '',
                        role: '',
                    });
                    setOpenModalUser(false);
                }}
                open={openModalUser}
                contents={
                    <UserForm form={form} isEdit={isEdit} dataForm={dataForm} onSetData={(data) => setDataForm(data)} />
                }
                onOk={handleSubmit}
                cancelText="Hủy"
                okText="Xác nhận"
                width={'60%'}
            />

            {/* <ThemeModal
                centered={true}
                title={'Xác nhận'}
                onCancel={() => {
                    setOpenConfirmModal(false);
                }}
                open={openConfirmModal}
                contents={<p>Bạn có chắc muốn xóa danh mục này không?</p>}
                onOk={handleDelete}
                cancelText="Hủy"
                okText="Xác nhận"
            /> */}

            <ThemeModal
                centered={true}
                title={'Đổi mật khẩu'}
                onCancel={() => {
                    form.resetFields(['oldPass', 'newPass']);
                    setDataForm({
                        oldPass: '',
                        newPass: '',
                    });
                    setOpenChangePassModal(false);
                }}
                open={openChangePassModal}
                contents={<ChangePassModal form={form} onSetData={(data) => setDataForm(data)} />}
                onOk={handleChangePass}
                cancelText="Hủy"
                okText="Xác nhận"
                style={{ top: '-20%' }}
            />
        </div>
    );
};

export default Users;
