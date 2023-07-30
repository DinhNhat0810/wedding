import { Breadcrumb } from 'antd';
import styles from './Introduce.module.scss';
import classNames from 'classnames/bind';
import { breadcrumbNameMap } from '../../utils/constant';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import Slogan from '../../components/Slogan/Slogan';
import { Helmet } from 'react-helmet-async';

const cx = classNames.bind(styles);

const Introduce = () => {
    const breadcrumbItems = useBreadCrumb(breadcrumbNameMap);

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Giới thiệu</title>
            </Helmet>
            <div className="container">
                <Breadcrumb
                    separator=">"
                    style={{ margin: '1rem 0 6rem 0', paddingBottom: '1rem', borderBottom: '0.1rem solid #ccc' }}
                    items={breadcrumbItems}
                />

                <p className={cx('title')}>Giới thiệu</p>
                <p className={cx('content')}>
                    Cưới hỏi Thiên Xuân là trung tâm sáng tạo và chuyên nghệp trong lĩnh vực tổ chức sự kiện và tổ chức
                    cưới hỏi trọn gói. Chúng tôi mang đến cho quý khách hàng dịch vụ cưới hỏi trọn gói hoàn hảo và tiết
                    kiệm với kinh nghiệm lâu năm đã tổ chức rất nhiều sự kiện lễ cưới hỏi lớn nhỏ tại Hà Nội. Cưới hỏi
                    trọn gói Thiên Xuân tự tin khẳng định dịch vụ uy tín và chất lượng số 1 tại Việt Nam, với hệ thống
                    dịch vụ đa dạng, sản phẩm truyền thống mẫu mã đẹp
                </p>
                <Slogan />
            </div>
        </div>
    );
};

export default Introduce;
