import { Breadcrumb, Col, Row, Select, Slider, Pagination, Empty } from 'antd';
import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import { breadcrumbNameMap } from '../../utils/constant';
import { useEffect, useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import ThemeLoading from '../../components/ThemeLoading/ThemeLoading';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import Slogan from '../../components/Slogan/Slogan';
import ProductItem from '../../components/ProductItem/ProductItem';
import { Helmet } from 'react-helmet-async';
import { getAllCategories } from '../../services/category';
import { getServiceForUser } from '../../services/services';

import { isEmptyArray } from '../../utils/common';

const cx = classNames.bind(styles);

const CategoryItem = ({ item, onActive, index, active }) => {
    return (
        <div
            onClick={() => {
                if (active !== index) {
                    onActive(item, index);
                }
            }}
            className={cx('item')}
            style={{ color: active === index && 'var(--primary-color)' }}
        >
            {item?.name}
        </div>
    );
};

// const options = [
//     {
//         label: 'Mặc định',
//         value: 'default',
//     },
//     {
//         label: 'A - Z',
//         value: '1',
//     },
//     {
//         label: 'Z - A',
//         value: '2',
//     },
//     {
//         label: 'Mới nhất',
//         value: '3',
//     },
//     {
//         label: 'Cũ nhất',
//         value: '4',
//     },
//     {
//         label: 'Tăng dần',
//         value: '5',
//     },
//     {
//         label: 'Giảm dần',
//         value: '6',
//     },
// ];

const propducts = [
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quaewqeqwewqeqweewqewy',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
    {
        title: 'Thịt lơn quay',
        image: 'https://nghiaphat.vn/wp-content/uploads/2023/01/mau-rap-dam-cuoi-dep-moi-nhat-hien-nay.jpg',
        price: 1000,
    },
];

const Category = () => {
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);
    const [active, setActive] = useState(1);
    const [price, setPrice] = useState({
        start: 0,
        end: 10000000,
    });
    const [dataCategories, setCategories] = useState([]);
    const [dataServices, setDataServices] = useState([]);
    const [dataSort, setDataSort] = useState('default');
    const [activePage, setActivePage] = useState(1);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        totalDocs: '',
    });
    const [categoryId, setCagoryId] = useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    useEffect(() => {
        getDataCategories();
    }, []);

    const handleChangePagination = (page) => {
        const payload = {
            id: categoryId,
        };
        getService(payload, page - 1);
        setActivePage(page);
    };

    const handleSetActive = async (item, index) => {
        setCategory(item);
        getService(item);
        setActive(index);
    };

    const getService = async (item, page) => {
        const params = {
            categoryId: item?.id,
            page: page || 0,
            smallPrice: price.start,
            largePrice: price.end,
            size: pagination?.pageSize,
        };

        setLoading(true);

        const res = await getServiceForUser(params);
        if (res) {
            setCagoryId(item?.id);
            console.log(res);
            setDataServices(res?.content);
            setPagination((prev) => {
                return {
                    ...prev,
                    total: res?.totalElements,
                };
            });
        }
        setLoading(false);
    };

    const getDataCategories = async (value) => {
        const callback = () => {};

        const res = await getAllCategories(callback);

        if (res) {
            // console.log(res);
            setCategories(res);
        }
    };

    const onChangePrice = (value) => {
        setPrice({
            start: value[0],
            end: value[1],
        });
    };

    const priceFilter = () => {
        const payload = {
            id: categoryId,
            smallPrice: price.start,
            largePrice: price.end,
        };
        getService(payload);
    };

    const handleChangeSort = async (e) => {
        try {
            setDataSort(e);
            console.log(e);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Tất cả dịch vụ</title>
            </Helmet>
            <div className="container">
                <ThemeLoading loading={loading} />
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />

                <Row gutter={36}>
                    <Col span={5}>
                        <h2>Danh mục</h2>
                        <div className={cx('category')}>
                            {dataCategories?.map((item, index) => {
                                return (
                                    <CategoryItem
                                        index={index}
                                        active={active}
                                        onActive={handleSetActive}
                                        item={item}
                                        key={index}
                                    />
                                );
                            })}
                        </div>

                        <h2>Giá tiền</h2>
                        <Slider min={0} max={10000000} range defaultValue={[0, 10000000]} onChange={onChangePrice} />

                        <div className={cx('price')}>
                            <p>{price.start?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>-
                            <p>{price.end?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                        </div>

                        <ThemeButton
                            onClick={priceFilter}
                            content="Lọc theo giá"
                            styles={{ width: '100%', height: '4rem' }}
                        />
                    </Col>
                    <Col span={19}>
                        <div className={cx('top')}>
                            <div className={cx('left')}>
                                <p>{category?.name}</p>
                            </div>

                            {/* <div className={cx('right')}>
                                <Select
                                    defaultValue="default"
                                    style={{
                                        width: '20rem',
                                    }}
                                    onChange={handleChangeSort}
                                    options={options}
                                />
                            </div> */}
                        </div>
                        <div className={cx('products')}>
                            <Row gutter={36}>
                                {!isEmptyArray(dataServices) ? (
                                    dataServices?.map((item, index) => {
                                        return <ProductItem key={index} item={item} positionAction="70%" />;
                                    })
                                ) : (
                                    <Empty
                                        description="Không có dịch vụ"
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            height: '400px',
                                        }}
                                    />
                                )}
                            </Row>
                        </div>
                        <div className={cx('pagination')}>
                            <Pagination
                                current={activePage}
                                onChange={handleChangePagination}
                                total={pagination?.total}
                                pageSize={pagination?.pageSize}
                                showSizeChanger={false}
                                showTotal={(total) => `Tổng số dịch vụ: ${total}`}
                            />
                        </div>
                    </Col>
                </Row>

                <Slogan />
            </div>
        </div>
    );
};

export default Category;
