import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const dataFooter = [
    {
        title: 'Liên hệ',
    },
    {
        title: 'Cung cấp nhân sự',
        menu: [
            { label: 'Dịch vụ bê tráp', path: 'dich-vu-be-trap' },
            { label: 'Thuê người đại diện', path: 'thue-nguoi-dai-dien' },
            { label: 'Dịch vụ bê tráp', path: 'dich-vu-be-trap' },
            { label: 'Thuê người đại diện', path: 'thue-nguoi-dai-dien' },
        ],
    },
    {
        title: 'Dịch vụ cung cấp',
        menu: [
            { label: 'Đặt tráp ăn hỏi', path: 'dich-vu-be-trap' },
            { label: 'Cho thuê bàn ghế', path: 'thue-nguoi-dai-dien' },
        ],
    },
    {
        title: 'Chính sách',
        menu: [
            { label: 'Chính sách bảo mật', path: 'dich-vu-be-trap' },
            { label: 'Chính sách vận chuyển', path: 'thue-nguoi-dai-dien' },
        ],
    },
];

function Footer() {
    return (
        <div className={cx('footer')}>
            <Row className={cx('container', 'inner')}>
                {dataFooter?.map((ele, index) => {
                    return (
                        <Col key={index} lg={6} xl={6}>
                            <p className={cx('title')}>{ele?.title}</p>
                            {ele?.menu ? (
                                ele?.menu?.map((e, i) => {
                                    return (
                                        <div key={i}>
                                            <Link to={e?.path}>{e?.label}</Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className={cx('contact')}>
                                    <p>Giờ làm việc</p>
                                    <p>Địa chỉ: Quân 10, Thành phố Hồ Chí Minh</p>
                                    <p>Số điện thoại: 0988674064</p>
                                    <p>Email: dsad.ewqehn@gmail.com</p>
                                </div>
                            )}
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Footer;
