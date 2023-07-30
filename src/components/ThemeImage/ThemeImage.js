import styles from './ThemeImage.module.scss';
import classNames from 'classnames/bind';
import { DeleteOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const ThemeImage = (props) => {
    const { src, style, action, className, ...rest } = props;
    return (
        <div className={cx('item-image')}>
            <img
                alt=""
                src={src}
                width={'100%'}
                height={'100%'}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    ...style,
                }}
                {...rest}
            />

            <div className={cx('item-image__icon')}>
                {action &&
                    // eslint-disable-next-line array-callback-return
                    action?.map((item, index) => {
                        if (item?.name === 'delete') {
                            return (
                                <DeleteOutlined
                                    key={index}
                                    onClick={() => item?.onClick(src)}
                                    className={cx('item-image__icon-delete')}
                                />
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export default ThemeImage;
