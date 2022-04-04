import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'

//member
import IndexMember from '../components/Member/Index.vue'
//tambah member
import TambahMember from '../components/Member/Tambah.vue'
//edit member
import EditMember from '../components/Member/Edit.vue'
//detail cuy
import DetailMember from '../components/Member/Detail.vue'

//paket
import IndexPaket from '../components/Paket/Index.vue'
import TambahPaket from '../components/Paket/Tambah.vue'
import EditPaket from '../components/Paket/Edit.vue'
import DetailPaket from '../components/Paket/Detail.vue'

//teransaksi
import IndexTransaksi from '../components/Transaksi/Index.vue'
import TambahTransaksi from '../components/Transaksi/Tambah.vue'
import EditTransaksi from '../components/Transaksi/Edit.vue'
import DetailTransaksi from '../components/Transaksi/Detail.vue'
import TambahDetail from '../components/Transaksi/TambahDetail.vue'

//outlet
import IndexOutlet from '../components/Outlet/Index.vue'
import TambahOutlet from '../components/Outlet/Tambah.vue'
import EditOutlet from '../components/Outlet/Edit.vue'

//Report
import Report from '../components/Report/Index.vue'

//User
import IndexUser from '../components/User/Index.vue'
import TambahUser from '../components/User/Tambah.vue'
import EditUser from '../components/User/Edit.vue'








Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/member/detail/:id',
        name: 'detailmember',
        component: DetailMember,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/member/edit/:id',
        name: 'editmember',
        component: EditMember,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/member',
        name: 'indexmember',
        component: IndexMember,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/member/tambah',
        name: 'tambahmember',
        component: TambahMember,
        meta: {
            requiresAuth: true
        }
    },
    //paket
    {
        path: '/paket',
        name: 'indexpaket',
        component: IndexPaket,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/paket/tambah',
        name: 'tambahpaket',
        component: TambahPaket,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/paket/edit/:id',
        name: 'editpaket',
        component: EditPaket,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/paket/detail/:id',
        name: 'detailpaket',
        component: DetailPaket,
        meta: {
            requiresAuth: true
        }
    },
    //transaksi
    {

        path: '/transaksi',
        name: 'indextransaksi',
        component: IndexTransaksi,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/transaksi/tambah',
        name: 'tambahtransaksi',
        component: TambahTransaksi,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/transaksi/edit/:id',
        name: 'edittransaksi',
        component: EditTransaksi,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/transaksi/detail/:id',
        name: 'detailtransaksi',
        component: DetailTransaksi,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/transaksi/detail/tambah/:id',
        name: 'tambah_detail',
        component: TambahDetail,
        meta: {
            requiresAuth: true
        }
    },
    //Outlet
    {
        path: '/outlet',
        name: 'indexoutlet',
        component: IndexOutlet,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/outlet/tambah',
        name: 'tambahoutlet',
        component: TambahOutlet,
        meta : {
          requiresAuth: true
        }
      },
      {
        path: '/outlet/edit/:id',
        name: 'editoutlet',
        component: EditOutlet,
        meta : {
          requiresAuth: true
        }
      },
    {
        path: '/report',
        name: 'report',
        component: Report,
        meta : {
          requiresAuth: true
        }
      },
    //User
    {
        path: '/user',
        name: 'indexuser',
        component: IndexUser,
        meta : {
          requiresAuth : true
        }
      },
      {
        path: '/user/tambah',
        name: 'tambahuser',
        component: TambahUser,
        meta : {
          requiresAuth : true
        }
      },
      {
        path: '/user/edit/:id',
        name: 'edituser',
        component: EditUser,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem('auth')) {
            next()
        } else {
            next('/login')
        }
    }
    next()
})
export default router