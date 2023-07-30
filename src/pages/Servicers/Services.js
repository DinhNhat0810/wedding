import { Breadcrumb, Col, Form, Row } from 'antd';
import styles from './Services.module.scss';
import classNames from 'classnames/bind';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import { breadcrumbNameMap, noImage } from '../../utils/constant';
import { useEffect, useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import Slogan from '../../components/Slogan/Slogan';
import { Helmet } from 'react-helmet-async';
import { Carousel } from 'antd';
import { getAllComboServices } from '../../services/comboServices';
import { isEmptyArray } from '../../utils/common';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Services = () => {
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);
    const navigate = useNavigate();

    const [dataServices, setDataServices] = useState([]);

    const getDataCategories = async (value) => {
        const res = await getAllComboServices();

        if (res?.content) {
            console.log(res?.content);
            setDataServices(res?.content?.slice(0, 6));
        }
    };

    useEffect(() => {
        getDataCategories();
    }, []);

    const handleClick = (item) => {
        navigate(`/goi-dich-vu/${item?.id}`);
        console.log(item);
        // navigate();
    };
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Gói dịch vụ</title>
            </Helmet>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />
                <h2 className={cx('title')}>Gói dịch vụ</h2>

                <Row gutter={24}>
                    {!isEmptyArray(dataServices) &&
                        dataServices?.map((item, index) => {
                            return (
                                <Col style={{ marginBottom: '4rem' }} key={index} xl={8} md={8} lg={8}>
                                    <div className={cx('combo')}>
                                        <p className={cx('combo__title')}>{item?.name}</p>
                                        <p className={cx('combo__price')}>{item?.totalAmount}</p>
                                        <img src={item?.image || noImage} alt="" className={cx('combo__img')} />

                                        <div className={cx('combo__list-item')}>
                                            {!isEmptyArray(item?.comboServiceViewModels) &&
                                                item?.comboServiceViewModels?.slice(0, 6)?.map((e, i) => {
                                                    return (
                                                        <p key={i} className={cx('combo__item')}>
                                                            {`${e?.quantity} ${e?.serviceViewModel?.name}`}
                                                        </p>
                                                    );
                                                })}
                                        </div>

                                        <div className={cx('combo__btn')}>
                                            <ThemeButton content="Xem chi tiết" onClick={() => handleClick(item)} />
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                </Row>

                <Slogan />
            </div>
        </div>
    );
};

export default Services;
