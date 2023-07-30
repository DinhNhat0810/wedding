import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Toaster position="top-right" reverseOrder={false} containerStyle={{ zIndex: '10000' }} />
            <Header />
            <div className={cx('children')}>{children}</div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
