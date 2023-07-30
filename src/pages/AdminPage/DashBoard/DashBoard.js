import { Breadcrumb, Col, Form, Row } from 'antd';
import styles from './DashBoard.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ThemeButton from '../../components/ThemeButton/ThemeButton';
import Slogan from '../../components/Slogan/Slogan';
const cx = classNames.bind(styles);

const DashBoard = () => {
    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <h2 className={cx('title')}>Quản trị</h2>
                <Row>
                    <Col lg={12} xl={12} className={cx('')}></Col>
                    <Col lg={12} xl={12}></Col>
                </Row>
                <Slogan />
            </div>
        </div>
    );
};

export default DashBoard;
