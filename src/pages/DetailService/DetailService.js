import { Breadcrumb, Carousel, Col, Image, Row } from 'antd';
import styles from './DetailService.module.scss';
import classNames from 'classnames/bind';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import { breadcrumbNameMap, noImage } from '../../utils/constant';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductItem from '../../components/ProductItem/ProductItem';
import Slogan from '../../components/Slogan/Slogan';
import { getServiceById } from '../../services/services';
import { convertToVnd, isEmptyArray } from '../../utils/common';

const cx = classNames.bind(styles);

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

const DetailService = () => {
    const [dataDetail, setDataDetail] = useState();
    const location = useLocation();
    const pathSnippets = decodeURIComponent(location.pathname);
    const nameService = pathSnippets?.split('/');
    breadcrumbNameMap[location.pathname] = dataDetail?.name;
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);
    const [quantity, setQuantity] = useState(0);

    const increaseNumber = () => {
        if (quantity >= dataDetail?.quantity) {
            return;
        }
        setQuantity(quantity + 1);
    };

    const decreaseNumber = () => {
        if (quantity !== 0) {
            setQuantity(quantity - 1);
        }
    };

    const getService = async () => {
        const payload = {
            id: nameService[nameService?.length - 1],
        };

        const res = await getServiceById(payload);

        if (res) {
            setDataDetail(res);
        }
    };

    useEffect(() => {
        getService();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />

                <Row gutter={48}>
                    <Col lg={10} xl={10}>
                        <Image
                            width={'100%'}
                            style={{ marginBottom: '1rem' }}
                            src={dataDetail?.linkImageBanner || noImage}
                        />

                        <Image.PreviewGroup>
                            <Row gutter={12}>
                                {!isEmptyArray(dataDetail?.imageServices) &&
                                    dataDetail?.imageServices?.map((item, index) => {
                                        return (
                                            <Col span={6} key={index}>
                                                <Image src={item?.linkImage} />
                                            </Col>
                                        );
                                    })}
                            </Row>
                        </Image.PreviewGroup>
                    </Col>
                    <Col lg={12} xl={12}>
                        <h2>{dataDetail?.name}</h2>
                        <div>
                            {/* <p className={cx('price')}>Liên hệ</p> */}
                            <p className={cx('detail')}>Còn lại: {dataDetail?.quantity}</p>

                            <p className={cx('detail')}>Giá: {convertToVnd(dataDetail?.price)}</p>
                        </div>
                        <div className={cx('cart')}>
                            <div className={cx('action')}>
                                <div className={cx('decrease')} onClick={decreaseNumber}>
                                    -
                                </div>
                                <input value={quantity} type="text" onChange={(e) => setQuantity(+e.target.value)} />
                                <div className={cx('increasse')} onClick={increaseNumber}>
                                    +
                                </div>
                            </div>
                            <ThemeButton
                                className={cx('payment')}
                                content="Thuê ngay"
                                styles={{ width: '20rem', height: '4rem' }}
                            />
                        </div>
                        {/* <div className={cx('bottom')}>
                            <div className={cx('like')}>
                                <FontAwesomeIcon
                                    size="xl"
                                    style={{ paddingRight: '5px', color: 'var(--primary-color)' }}
                                    icon={faHeart}
                                />
                                <p>Thêm vào yêu thích</p>
                            </div>
                        </div> */}
                    </Col>
                </Row>

                <div className={cx('content')}>
                    <h3>Mô tả</h3>
                    <p>{dataDetail?.description}</p>
                </div>

                <div className={cx('recommered')}>
                    <p>DỊCH VỤ LIÊN QUAN</p>
                    <Row gutter={36}>
                        {propducts?.slice(0, 6)?.map((item, index) => {
                            return <ProductItem key={index} item={item} xl={4} lg={4} positionAction="35%" />;
                        })}
                    </Row>
                </div>

                <Slogan />
            </div>
        </div>
    );
};

export default DetailService;
