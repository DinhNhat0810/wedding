import { Breadcrumb, Col, Form, Row, Image as ImageTag, Input, Image } from 'antd';
import styles from './Categories.module.scss';
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
import { blockOptions } from '../../../utils/constant';

const cx = classNames.bind(styles);

const AddCategory = (props) => {
    const { form, onSetData, dataForm, isEdit } = props;
    const [picture, setPicture] = useState('');

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                name: dataForm?.name,
                description: dataForm?.description,
            });
        }
        setPicture(dataForm?.image);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataForm]);

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
                label="Tên danh mục"
                name="name"
                placeholder="Mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên danh mục!',
                    },
                ]}
                onChange={(e) => {
                    onSetData((prev) => {
                        return {
                            ...prev,
                            name: e.target.value,
                        };
                    });
                }}
            />

            <ThemeInput
                label="Mô tả danh mục"
                name="description"
                placeholder="Mô tả"
                type="area"
                autoSize={{ minRows: 3, maxRows: 8 }}
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mô tả!',
                    },
                ]}
                onChange={(e) => {
                    onSetData((prev) => {
                        return {
                            ...prev,
                            description: e.target.value,
                        };
                    });
                }}
            />

            <ThemeInput
                label="Khóa"
                name="block"
                type="dropdown"
                option={blockOptions}
                onChange={(e) => {
                    onSetData((prev) => {
                        return {
                            ...prev,
                            block: e,
                        };
                    });
                }}
            />

            {picture && (
                <div style={{ marginBottom: '2rem' }}>
                    <Image
                        src={picture}
                        width={'50%'}
                        height={300}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                </div>
            )}

            <UploadImage
                showUploadList={false}
                onGetImage={(data) => {
                    onSetData((prev) => {
                        return {
                            ...prev,
                            image: data,
                        };
                    });
                }}
            />
        </Form>
    );
};

const Categories = () => {
    const { currentUser } = useSelector(selectUser);
    const [dataSource, setDataSource] = useState(null);
    const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [form] = Form.useForm();
    const [dataForm, setDataForm] = useState({
        image: '',
        name: '',
        description: '',
        id: '',
        block: false,
    });
    const [titleModal, setTitleModal] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [idRecord, setIdRecord] = useState(null);

    const showModal = (title, record) => {
        if (record) {
            setIsEdit(true);
            setDataForm({
                image: record?.image,
                name: record?.name,
                description: record?.description,
                id: record?.id,
            });
        } else {
            setIsEdit(false);
        }

        setTitleModal(title);
        setOpenModalAddCategory(true);
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            // sorter: true,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: (text) => <span className={cx('description')}>{`${text}`}</span>,
            // sorter: true,
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            // sorter: true,
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'updateDate',
            key: 'updateDate',
            // sorter: true,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
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
                <>
                    <EditOutlined
                        style={{ fontSize: '2rem', marginRight: '1rem', color: ' green' }}
                        onClick={() => showModal('Chỉnh sửa', record)}
                    />
                    <DeleteOutlined
                        style={{ fontSize: '2rem', color: ' red' }}
                        onClick={() => {
                            setIdRecord(record?.id);
                            setOpenConfirmModal(true);
                        }}
                    />
                </>
            ),
        },
    ];

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

    const getData = async () => {
        const callback = (data) => {
            if (data?.response?.data.status === 403) {
                window.location.reload();
            }
        };

        const config = {
            headers: {
                Authorization: `Bearer ${currentUser?.token}`,
            },
        };

        const res = await getCategoriesByAdminOrManager(callback, config);

        if (res) {
            setDataSource(res);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async () => {
        form.submit();

        try {
            const data = await form.validateFields(['name', 'description']);

            const payload = {
                name: data?.name,
                description: data?.description,
                image: dataForm?.image,
                block: dataForm?.block,
            };

            const callback = (data) => {
                toast.error(data?.response?.data?.errorMessage);
            };

            let res;

            if (isEdit) {
                res = await updateCategoryByAdmin(dataForm?.id, payload, callback);
            } else {
                res = await addCategoryByAdmin(payload, callback);
            }

            if (res?.data) {
                setOpenModalAddCategory(false);
                form.resetFields(['name', 'description']);
                setDataForm({
                    image: '',
                    name: '',
                    description: '',
                    id: '',
                    block: false,
                });
                toast.success('Thành công!');
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Quản lý danh mục</title>
            </Helmet>

            <div className={cx('table')}>
                <div className={cx('table_title')}>
                    <p>Quản lý danh mục</p>
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
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>

            <ThemeModal
                centered={true}
                title={titleModal}
                onCancel={() => {
                    form.resetFields(['name', 'description']);
                    setDataForm({
                        image: '',
                        name: '',
                        description: '',
                        id: '',
                        block: false,
                    });
                    setOpenModalAddCategory(false);
                }}
                open={openModalAddCategory}
                contents={
                    <AddCategory
                        form={form}
                        isEdit={isEdit}
                        dataForm={dataForm}
                        onSetData={(data) => setDataForm(data)}
                    />
                }
                onOk={handleSubmit}
                cancelText="Hủy"
                okText="Xác nhận"
                style={{ top: '-10%' }}
                width={'60%'}
            />

            <ThemeModal
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
                style={{ top: '-30%' }}
            />
        </div>
    );
};

export default Categories;
