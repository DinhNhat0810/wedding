import { Form, Input, Select } from 'antd';
const { TextArea } = Input;

const ThemeInput = (props) => {
    const {
        stylesLabel,
        label,
        name,
        rules,
        disabled,
        defaultValue,
        dependencies,
        initialValues,
        prefix,
        size,
        type,
        value,
        allowClear,
        placeholder,
        stylesItem,
        stylesInput,
        onFocus,
        onBlur,
        hasFeedback,
        onChange = () => {},
        onPressEnter = () => {},
        onKeyDown = () => {},
        maxLength,
        autoSize,
        option,
        selectMode,
    } = props;

    return (
        <div>
            <p style={{ ...stylesLabel, fontWeight: '500' }}>{label}</p>
            <Form.Item
                name={name}
                rules={rules}
                style={stylesItem}
                hasFeedback={hasFeedback}
                initialvalues={initialValues}
                dependencies={dependencies}
            >
                {(type === 'password' || !type) && (
                    <Input
                        defaultValue={defaultValue}
                        disabled={disabled}
                        prefix={prefix}
                        size={size}
                        type={type}
                        value={value}
                        allowClear={allowClear}
                        placeholder={placeholder}
                        style={{ ...stylesInput, width: '100%' }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={onChange}
                        onPressEnter={onPressEnter}
                        onKeyDown={onKeyDown}
                    />
                )}
                {type === 'area' && (
                    <TextArea
                        placeholder={placeholder}
                        autoSize={autoSize}
                        allowClear={allowClear}
                        maxLength={maxLength}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        style={{ ...stylesInput, width: '100%' }}
                    />
                )}

                {type === 'dropdown' && (
                    <Select
                        style={{ ...stylesInput, width: '100%' }}
                        onChange={onChange}
                        options={option}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        mode={selectMode}
                    />
                )}
            </Form.Item>
        </div>
    );
};

export default ThemeInput;
