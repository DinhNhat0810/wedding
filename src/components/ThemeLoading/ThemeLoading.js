import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ThemeLoading = ({ loading }) => {
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
                color: '#fff',
            }}
            spin
        />
    );

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                zIndex: '10000',
                justifyContent: 'center',
                alignItems: 'center',
                display: loading ? 'flex' : 'none',
                background: 'rgba(0, 0, 0, 0.4)',
            }}
        >
            <Spin indicator={antIcon}></Spin>
        </div>
    );
};

export default ThemeLoading;
