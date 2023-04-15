// 1. 引入对应模块
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../pages/Home/Home';
import Login from './../pages/Login/Login';
import Search from './../pages/Search/Search';
import Goods from './../pages/Goods/Goods';
import Me from './../pages/Me/Me';
import ShopCar from './../pages/ShopCar/ShopCar';
import AdminLogin from './../pages/AdminLogin/AdminLogin';
import Admin from './../pages/Admin/Admin';
import SearchDetail from './../pages/SearchDetail/SearchDetail';
import Order from './../pages/Order/Order';
import Profile from './../pages/Me/Children/Profile';
import Update from './../pages/Me/Children/Update';
import EditPwd from './../pages/Me/Children/EditPwd';
import EditPhone from './../pages/Me/Children/EditPhone';
import Sales from './../pages/Me/Children/Sales';
import AdminSales from './../pages/Admin/Children/AdminSales';
import AddGoods from './../pages/Admin/Children/AddGoods';
import AdminGoods from './../pages/Admin/Children/AdminGoods';
import AdminUpdate from './../pages/Admin/Children/AdminUpdate';
import AdminUsers from './../pages/Admin/Children/AdminUsers';

// 2. 声明使用
Vue.use(VueRouter);

// 3. 输出路由对象
export default new VueRouter({
  // 3.1 配置一级路由
  routes: [
    {
      path: '/home',
      component: Home,
      meta: { showHeaderTop: true, showHeaderSearch: true }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/search/:id/:pageNo',
      component: Search,
      meta: { showHeaderTop: true, showHeaderSearch: true }
    },
    {
      path: '/goods/:id',
      component: Goods,
      meta: { showHeaderTop: true }
    },
    {
      path: '/me',
      component: Me,
      children: [
        { path: 'profile', component: Profile },
        { path: 'update', component: Update },
        { path: 'editpwd', component: EditPwd },
        { path: 'editphone', component: EditPhone },
        { path: 'sales', component: Sales },
        { path: '/me', redirect: '/me/profile' }
      ],
    },
    {
      path: '/shopcar',
      component: ShopCar,
      meta: { showHeaderTop: true }
    },
    {
      path: '/adminlogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        { path: 'adminsales', component: AdminSales },
        { path: 'adminusers', component: AdminUsers },
        { path: 'addgoods', component: AddGoods },
        { path: 'admingoods', component: AdminGoods },
        { path: 'adminupdate', component: AdminUpdate },
        { path: '/admin', redirect: '/admin/admingoods' }
      ],
    },
    {
      path: '/searchdetail',
      component: SearchDetail,
      meta: { showHeaderTop: true, showHeaderSearch: true }
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/',
      redirect: '/home'
    },
  ]
});
