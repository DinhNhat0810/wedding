import { Breadcrumb, Col, Form, Row } from 'antd';
import styles from './ManagerOrders.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles);

const ManagerOrders = () => {
    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <h2 className={cx('title')}>Quản lý đơn hàng</h2>
                <Row>
                    <Col lg={12} xl={12} className={cx('')}></Col>
                    <Col lg={12} xl={12}></Col>
                </Row>
            </div>
        </div>
    );
};

export default ManagerOrders;
