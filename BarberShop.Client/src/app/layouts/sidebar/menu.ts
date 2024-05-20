import {MenuItem} from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENU.Dashboard',
        icon: ' fas fa-home',
        link: '/admin/dashboard',
    },
    {
        id: 2,
        label: 'MENU.USERS',
        icon: ' fas fa-user-friends',
        link: '/admin/users',
    },
    {
        id: 3,
        label: 'MENU.WALLETS',
        icon: 'fas fa-wallet',
        subItems: [
            {
                id: 4,
                label: 'MENU.MY_WALLET',
                link: '/admin/wallets/my-wallet',
                parentId: 3
            },
            {
                id: 5,
                label: 'MENU.WALLET_TRANSACTIONS',
                link: '/admin/wallets/wallet-transaction',
                parentId: 3
            }
        ]
    },
    {
        id: 4,
        label: 'MENU.BANKS',
        icon: 'fas fa-landmark',
        link: '/admin/security/users',
    },
];

