import { Carousel, Col, Row } from 'antd';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import images from '../../assets/images';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/category';
import { getServiceForUser } from '../../services/services';
const cx = classNames.bind(styles);

const Home = () => {
    const [dataServices, setDataServices] = useState([]);
    const contentStyle = {
        margin: 0,
        height: '40rem',
        width: '100%',
    };

    const slideImages = [
        { path: images.slider1 },
        { path: images.slider2 },
        { path: images.slider3 },
        { path: images.slider4 },
    ];

    const services = [
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
        {
            image: images.slider1,
            title: 'Lễ ăn hỏi',
        },
    ];

    // const getService = async (item, page) => {
    //     const params = {
    //         categoryId: item?.id,
    //         page: page || 0,
    //         smallPrice: '',
    //         largePrice: '',
    //         size: 12,
    //     };

    //     const res = await getServiceForUser(params);
    //     if (res) {
    //         setDataServices(res?.content);
    //     }
    // };

    // useEffect(() => {
    //     getService()
    // }, [])

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <Row>
                <Col span={8}>
                    <div className={cx('banner')}>
                        <img src={images.slider5} alt={''} />
                        <img src={images.slider6} alt={''} />
                    </div>
                </Col>
                <Col span={16}>
                    <div className={cx('carousel')}>
                        <Carousel autoplay>
                            {slideImages?.map((item, index) => {
                                return (
                                    <div key={index} style={contentStyle}>
                                        <img src={item?.path} alt={''} />
                                    </div>
                                );
                            })}
                        </Carousel>
                    </div>
                </Col>
            </Row>

            <div className={cx('service', 'container')}>
                <h2>DỊCH VỤ CUNG CẤP</h2>
                <Row className={cx('inner')} gutter={36}>
                    {services?.map((item, index) => {
                        return (
                            <Col key={index} xl={6} lg={6} md={8} sm={12} xs={24}>
                                <div>
                                    <img src={item?.image} alt="" />
                                </div>
                                <p>{item?.title}</p>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default Home;
