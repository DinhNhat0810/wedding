export const breadcrumbNameMap = {
    '/gioi-thieu': 'Giới thiệu',
    '/dang-nhap': 'Đăng nhập tài khoản',
    '/dang-ky': 'Đăng ký tài khoản',
    '/dich-vu': 'Tất cả dịch vụ',
    '/lien-he': 'Liên hệ',
    '/tim-kiem': 'Tìm kiếm',
    '/goi-dich-vu': 'Gói dịch vụ',
    '/tai-khoan': 'Thông tin tài khoản',
};

export const genderOptions = [
    {
        value: 0,
        label: 'Nam',
    },
    {
        value: 1,
        label: 'Nữ',
    },
];

export const blockOptions = [
    {
        value: true,
        label: 'Có',
    },
    {
        value: false,
        label: 'Không',
    },
];

export const ROLES = [
    {
        label: 'Staff',
        value: 'ROLE_STAFF',
        name: 'ROLE_STAFF',
    },
    {
        label: 'ROLE_ADMIN',
        value: 'ROLE_ADMIN',
        name: 'Admin',
    },
    {
        label: 'Manager',
        value: 'ROLE_MANAGER',
        name: 'ROLE_MANAGER',
    },
    {
        label: 'Partner',
        value: 'ROLE_PARTNER',
        name: 'ROLE_PARTNER',
    },
    {
        label: 'Owner Store',
        value: 'ROLE_STORE_OWNER',
        name: 'ROLE_STORE_OWNER',
    },
    {
        label: 'User',
        value: 'ROLE_USER',
        name: 'ROLE_USER',
    },
];

export const sideBarAdmin = [
    // { title: 'DashBoard', path: '/quan-tri' },
    { title: 'Quản lý người dùng', path: '/quan-tri/nguoi-dung' },
    { title: 'Quản lý danh mục', path: '/quan-tri/danh-muc' },
    // { title: 'Quản lý nhân viên', path: '/quan-tri/nhan-vien' },
    // { title: 'Quản lý users', path: '/quan-tri/users' },
];

export const sideBarManager = [
    { title: 'Doanh thu', path: '/quan-tri/doanh-thu' },
    { title: 'Quản lý dịch vụ', path: '/quan-tri/dich-vu' },
    { title: 'Quản lý đơn', path: '/quan-tri/don-hang' },
    // { title: 'Quản lý users', path: '/quan-tri/users' },
];

export const noImage =
    'data:image/png;base64,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';

export const backgroundImage = 'https://image.namtay.vn/fit/1000/images/article/JCaaE0exdN_1.png';
