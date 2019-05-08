import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import AppAddress from '@/components/AppAddress'
import AppTypeDemenagement from '@/components/AppTypeDemenagement'
import AppDureePrestation from '@/components/AppDureePrestation'
import AppTailleLogement from '@/components/AppTailleLogement'
import AppInventaire from '@/components/AppInventaire'
import AppDemontage from '@/components/AppDemontage'
import AppDateDemenagement from '@/components/AppDateDemenagement'
import AppOptions from '@/components/AppOptions'
import AppRecapitulatif from '@/components/AppRecapitulatif'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/dashboard'
        },
        {
            path: '/addresses',
            name: 'AppAddress',
            component: AppAddress
        },
        {
            path: '/type_demenagement',
            name: 'AppTypeDemenagement',
            component: AppTypeDemenagement
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

export default router
