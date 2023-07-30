import { Col, Form, Row, Image, Switch } from 'antd';
import styles from './ManagerServices.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ThemeTable from '../../../components/ThemeTable/ThemeTable';
import ThemeButton from '../../../components/ThemeButton/ThemeButton';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getAllCategories } from '../../../services/category';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/user/userSlice';
import { toast } from 'react-hot-toast';
import ThemeModal from '../../../components/ThemeModal/ThemeModal';
import ThemeInput from '../../../components/ThemeInput/ThemeInput';
import UploadImage from '../../../components/UploadImage/UploadImage';
import {
    addServiceByManager,
    deleteServiceByManager,
    getAllServicesByManager,
    updateServiceByManager,
} from '../../../services/services';
import UploadMultipleImage from '../../../components/UploadImage/UploadMultiImage';
import { isEmptyArray } from '../../../utils/common';
import ThemeImage from '../../../components/ThemeImage/ThemeImage';

const cx = classNames.bind(styles);

const ManagerServicesForm = (props) => {
    const { form, onSetData, dataForm, isEdit, dataCategories } = props;
    const [imageBanner, setImageBanner] = useState('');
    const [listImageService, setListImageService] = useState([]);
    const actionImage = [
        {
            name: 'delete',
            onClick: (data) => handleDeleteImage(data),
        },
    ];

    const inputFields = [
        {
            label: 'Tên dịch vụ',
            field: 'name',
            type: 'string',
            col: {
                lg: 12,
                xl: 12,
                md: 12,
            },
        },
        {
            label: 'Mô tả',
            field: 'description',
            type: 'string',
            col: {
                lg: 12,
                xl: 12,
                md: 12,
            },
        },
        {
            label: 'Giá tiền',
            field: 'price',
            type: 'string',
            col: {
                lg: 12,
                xl: 12,
                md: 12,
            },
        },
        {
            label: 'Số lượng',
            field: 'quantity',
            type: 'string',
            col: {
                lg: 12,
                xl: 12,
                md: 12,
            },
        },
        {
            label: 'Danh mục',
            field: 'categoryId',
            type: 'dropdown',
            col: {
                lg: 24,
                xl: 24,
                md: 24,
            },
            option: dataCategories,
        },
        {
            label: 'Banner',
            field: 'linkImageBanner',
            type: 'file',
            col: {
                lg: 12,
                xl: 12,
                md: 12,
            },
        },
        {
            label: 'Hình ảnh',
            field: 'listLinkImage',
            type: 'multiple',
            col: {
                lg: 12,
                xl: 12,
                md: 12,
            },
        },
    ];

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                name: dataForm?.name,
                description: dataForm?.description,
                price: dataForm?.price,
                quantity: dataForm?.quantity,
                categoryId: dataForm?.categoryId,
            });
        }
        setImageBanner(dataForm?.linkImageBanner);
        setListImageService(dataForm?.listLinkImage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataForm]);

    const handleDeleteImage = (data) => {
        const newList = listImageService?.filter((item) => item !== data);
        onSetData((prev) => {
            return {
                ...prev,
                listLinkImage: newList,
            };
        });
    };

    return (
        <Form
            initialValues={{
                remember: true,
            }}
            name="ManagerServicesForm"
            form={form}
            autoComplete="off"
        >
            <Row gutter={24}>
                {inputFields?.map((item, index) => {
                    if (item.type === 'string') {
                        return (
                            <Col key={index} lg={item?.col?.lg} md={item?.col?.md} xl={item?.col?.xl}>
                                <ThemeInput
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
                            <Col key={index} lg={item?.col?.lg} md={item?.col?.md} xl={item?.col?.xl}>
                                <ThemeInput
                                    key={index}
                                    label={item?.label}
                                    name={item?.field}
                                    placeholder={item?.label}
                                    option={item?.option}
                                    type="dropdown"
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
                            <Col key={index} lg={item?.col?.lg} md={item?.col?.md} xl={item?.col?.xl}>
                                <div key={index} style={{ margin: '2rem 0' }}>
                                    <p style={{ fontWeight: 500 }}>{item?.label}</p>
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
                                {imageBanner && (
                                    <div style={{ marginBottom: '2rem' }}>
                                        <img
                                            alt=""
                                            src={imageBanner}
                                            width={'90%'}
                                            height={200}
                                            style={{
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                            }}
                                        />
                                    </div>
                                )}
                            </Col>
                        );
                    }

                    if (item.type === 'multiple') {
                        return (
                            <Col key={index} lg={item?.col?.lg} md={item?.col?.md} xl={item?.col?.xl}>
                                <div style={{ margin: '2rem 0' }}>
                                    <p style={{ fontWeight: 500 }}>{item?.label}</p>
                                    <UploadMultipleImage
                                        onGetImage={(data) => {
                                            onSetData((prev) => {
                                                return {
                                                    ...prev,
                                                    [item?.field]: [...prev[item?.field], ...data],
                                                };
                                            });
                                        }}
                                    />

                                    <div className={cx('list-image')}>
                                        {!isEmptyArray(listImageService) &&
                                            listImageService?.map((e, index) => {
                                                return <ThemeImage src={e} key={index} action={actionImage} />;
                                            })}
                                    </div>
                                </div>
                            </Col>
                        );
                    }
                })}
            </Row>
        </Form>
    );
};

const ManagerServices = () => {
    const { currentUser } = useSelector(selectUser);
    const [dataSource, setDataSource] = useState(null);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [activePagation, setActivePagination] = useState(1);
    const [form] = Form.useForm();
    const [dataForm, setDataForm] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        linkImageBanner: '',
        listLinkImage: [],
        categoryId: '',
        id: '',
    });
    const [titleModal, setTitleModal] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [idRecord, setIdRecord] = useState(null);
    const [dataCategories, setDataCategories] = useState([]);

    const handlePaginationChange = (page) => {
        getData(page - 1);
        setActivePagination(page);
    };

    const showModal = (title, record) => {
        console.log(record);
        if (record) {
            setIsEdit(true);
            setDataForm({
                name: record?.name,
                description: record?.description,
                price: record?.price,
                quantity: record?.quantity,
                linkImageBanner: record?.linkImageBanner,
                listLinkImage: record?.imageServices?.map((item) => item?.linkImage) || [],
                id: record?.id,
                categoryId: record?.category?.id,
            });
        } else {
            setIsEdit(false);
        }

        setTitleModal(title);
        setOpenModalUser(true);
    };

    const columns = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            // sorter: true,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            // sorter: true,
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            // sorter: true,
        },
        {
            title: 'Tạo bởi',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (data) => <p>{data?.username}</p>,
            // sorter: true,
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'updateDate',
            key: 'updateDate',
            // sorter: true,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            // sorter: true,
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
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
            title: 'Banner',
            dataIndex: 'linkImageBanner',
            key: 'linkImageBanner',
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
                    <DeleteOutlined
                        style={{ fontSize: '2rem', marginRight: '1rem', color: ' red' }}
                        onClick={() => {
                            setIdRecord(record?.id);
                            setOpenConfirmModal(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    const handleChangeStatusAccount = async (id) => {
        // const callback = (data) => {
        //     toast.error(data?.response?.data?.errorMessage);
        // };
        // const payload = {
        //     id: id,
        // };
        // const res = await changeStatusAccount(payload, callback);
        // if (res) {
        //     toast.success('Thành công!');
        // }
    };

    const handleDelete = async () => {
        const res = await deleteServiceByManager(idRecord);
        if (res) {
            setOpenConfirmModal(false);
            getData();
            toast.success('Thành công!');
        }
    };

    const getData = async (page) => {
        const payload = {
            page: page || 0,
            size: 10,
        };

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

        const res = await getAllServicesByManager(payload, callback, config);

        if (res) {
            setDataSource(res);
        }
    };

    const getCategories = async (page) => {
        const callback = (data) => {
            toast.error(data?.response?.data?.errorMessage);
        };

        const res = await getAllCategories(callback);

        if (res) {
            const newRes = res?.map((item) => {
                return {
                    value: item?.id,
                    label: item?.name,
                };
            });
            // console.log(res);
            setDataCategories(newRes);
        }
    };

    useEffect(() => {
        getData();
        getCategories();
    }, []);

    const handleSubmit = async () => {
        form.submit();

        try {
            await form.validateFields();

            const payload = {
                name: dataForm?.name,
                description: dataForm?.description,
                price: dataForm?.price,
                quantity: dataForm?.quantity,
                linkImageBanner: dataForm?.linkImageBanner,
                listLinkImage: dataForm?.listLinkImage,
                categoryId: dataForm?.categoryId,
            };

            console.log(payload);

            let res;

            if (isEdit) {
                res = await updateServiceByManager(dataForm?.id, payload);
            } else {
                res = await addServiceByManager(payload);
            }

            if (res?.status === 208) {
                toast.error(res?.data?.errorMessage);
            } else {
                setOpenModalUser(false);
                form.resetFields();
                setDataForm({
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    linkImageBanner: '',
                    id: '',
                    categoryId: '',
                    listLinkImage: [],
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
                <title>Quản lý dịch vụ</title>
            </Helmet>

            <div className={cx('table')}>
                <div className={cx('table_title')}>
                    <p>Quản lý dịch vụ</p>
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
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        linkImageBanner: '',
                        id: '',
                        categoryId: '',
                        listLinkImage: [],
                    });
                    setOpenModalUser(false);
                }}
                open={openModalUser}
                contents={
                    <ManagerServicesForm
                        form={form}
                        isEdit={isEdit}
                        dataForm={dataForm}
                        onSetData={(data) => setDataForm(data)}
                        dataCategories={dataCategories}
                    />
                }
                onOk={handleSubmit}
                cancelText="Hủy"
                okText="Xác nhận"
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
                style={{ top: '-20%' }}
            />
        </div>
    );
};

export default ManagerServices;
