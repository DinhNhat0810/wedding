import styles from './Slogan.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Slogan = () => {
    return (
        <p className={cx('slogan')}>
            Có thể nói đám cưới là khởi đầu cho một chặng đường mới của các đôi uyên ương, vì thế lựa chọn dịch vụ cho
            ngày trọng đại của cuộc đời là rất quan trọng
        </p>
    );
};

export default Slogan;
