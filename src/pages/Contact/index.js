import { Breadcrumb, Col, Form, Row } from 'antd';
import styles from './Contact.module.scss';
import classNames from 'classnames/bind';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import { breadcrumbNameMap } from '../../utils/constant';
import { useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import Slogan from '../../components/Slogan/Slogan';
import { Helmet } from 'react-helmet-async';
const cx = classNames.bind(styles);

const Contact = () => {
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Liên hệ</title>
            </Helmet>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />
                <h2 className={cx('title')}>Liên hệ</h2>
                <Row>
                    <Col lg={12} xl={12} className={cx('right')}>
                        <p>Chi nhánh 1: Số 01, ngõ 167, Thanh Nhàn, Hai Bà Trưng, Hà Nội,</p>
                        <p>Hotline tư vấn 1: 0988674064</p>
                        <p>Web: https://dichvucuoihoivn.mysapo.net</p>
                        <p>Facebook:</p>
                        <p>Youtobe:</p>
                    </Col>
                    <Col lg={12} xl={12}></Col>
                </Row>
                <Slogan />
            </div>
        </div>
    );
};

export default Contact;
