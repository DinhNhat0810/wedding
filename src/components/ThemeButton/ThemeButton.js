import { Button } from 'antd';

const ThemeButton = (props) => {
    const { styles, content, type, disabled, ghost, onClick, className, icon, ...rest } = props;
    return (
        <Button
            style={{
                backgroundColor: '#e53e48',
                color: '#FFF',
                ...styles,
            }}
            icon={icon}
            type={type}
            disabled={disabled}
            ghost={ghost}
            onClick={onClick}
            className={className}
            {...rest}
        >
            {content}
        </Button>
    );
};

export default ThemeButton;
