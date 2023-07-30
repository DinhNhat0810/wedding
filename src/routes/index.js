import routes from '../config/routes';
import Admin from '../layouts/Admin/Admin';
import AdminPage from '../pages/AdminPage';
import Users from '../pages/AdminPage/Users/Users';
import Categories from '../pages/AdminPage/Categories/Categories';
import Category from '../pages/Category';
import Contact from '../pages/Contact';
import DetailService from '../pages/DetailService/DetailService';
import Home from '../pages/Home';
import Introduce from '../pages/Introduce';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register/Register';
import Search from '../pages/Search/Search';
import Services from '../pages/Servicers/Services';
import VerifyAccount from '../pages/Auth/VerifyAccount/VerifyAccount';
import ResetPassword from '../pages/Auth/ResetPassword/ResetPassword';
import AccountInfor from '../pages/AccountInfor/AccountInfor';
import Staffs from '../pages/AdminPage/Staffs/Staffs';
import ManagerServices from '../pages/AdminPage/ManagerServices/ManagerServices';
import ManagerRevenue from '../pages/AdminPage/ManagerRevenue/ManagerRevenue';
import ManagerOrders from '../pages/AdminPage/ManagerOrders/ManagerOrders';
import StoreService from '../pages/AdminPage/StoreService/StoreService';
import DetailCombo from '../pages/DetailCombo/DetailCombo';

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.login, component: Login },
    { path: routes.verifyAccount, component: VerifyAccount },
    { path: routes.resetPassword, component: ResetPassword },
    { path: routes.register, component: Register },
    { path: routes.introduce, component: Introduce },
    { path: routes.service, component: Category },
    { path: routes.contact, component: Contact },
    { path: routes.detailService, component: DetailService },
    { path: routes.search, component: Search },
    { path: routes.services, component: Services },
    { path: routes.detailCombo, component: DetailCombo },
];

const privateRoutes = [
    { path: routes.account, component: AccountInfor, adminPage: false },
    { path: routes.storeService, component: StoreService, adminPage: false },
    { path: routes.admin, component: AdminPage, layout: Admin, adminPage: true },
    { path: routes.adminUsers, component: Users, layout: Admin, adminPage: true },
    { path: routes.adminStaffs, component: Staffs, layout: Admin, adminPage: true },
    { path: routes.adminCategories, component: Categories, layout: Admin, adminPage: true },
    { path: routes.managerCategories, component: ManagerServices, layout: Admin, adminPage: true },
    { path: routes.managerRevenue, component: ManagerRevenue, layout: Admin, adminPage: true },
    { path: routes.managerOrders, component: ManagerOrders, layout: Admin, adminPage: true },
];

export { publicRoutes, privateRoutes };
