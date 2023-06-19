// pages
import AddEdit from '../components/AddEdit/AddEdit';
import AddCart from '../pages/AddCart';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Men from '../pages/Men';
import MenDetail from '../pages/MenDeital';
import Payment from '../pages/Payment';
import Register from '../pages/Register';
import Women from '../pages/Women';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/women', component: Women },
    { path: '/add', component: AddEdit },
    { path: '/update/:id', component: AddEdit },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/men', component: Men },
    { path: '/men/:idProductMen', component: MenDetail },

    // { path: '/view/:id', component: View },
];

const privateRoutes = [
    { path: '/payment', component: Payment },
    { path: '/cart', component: AddCart },
];

export { publicRoutes, privateRoutes };
