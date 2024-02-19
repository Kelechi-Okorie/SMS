module.exports = (options) => {
    const { user } = options;

    const menu = [
        {
            text: 'Dashboard',
            icon: '<i clas>s="bi bi-speedometer"></i',
            route: '/dashboard'
        }
    ];

    if (user.isPortalAdmin) {
        const portalAdminMenus = [
            {
                text: 'Schools',
                icon: '<i class="bi bi-bank"></i>',
                route: '/dashboard/schools',
                isCurrent: false
            },
            {
                text: 'Users',
                icon: '<i class="bi bi-person"></i>',
                route: '/dashboard/users',
                isCurrent: false
            },
            {
                text: 'Portal Admins',
                icon: '<i class="bi bi-people-fill"></i>',
                route: '/dashboard/portal-admins',
                isCurrent: false
            },
            {
                text: 'School Types',
                icon: '<i class="bi bi-bank"></i>',
                route: '/dashboard/school-types',
                isCurrent: false
            },
            {
                text: 'Settings',
                icon: '<i class="bi bi-gear"></i>',
                route: '/dashboard/settings',
                isCurrent: false,
            }
        ];

        menu = menu.concat(portalAdminMenus);

    } else if (user.isSchoolStaff) {
        const schoolStaffMenu = [
            {
                text: 'Add Scores',
                icon: '<i class="bi bi-123"></i>',
                route: '/dashboard/scores',
                isCurrent: false
            },
            {
                text: 'My Classes',
                icon: '<i class="bi bi-archive"></i>',
                route: '/dashboard/my-classes',
                isCurrent: false
            },
            {
                text: 'Expense Requests',
                icon: '<i class="bi bi-currency-dollar"></i>',
                route: '/dashboard/expense-requests',
                isCurrent: false
            },
            {
                text: 'Notice Board',
                icon: '<i class="bi bi-info-circle"></i>',
                route: '/dashboard/notice-board',
                isCurrent: false
            },
            {
                text: 'Sessions',
                icon: '<i class="bi bi-bookmark-check"></i>',
                route: '/dashboard/sessions',
                isCurrent: false
            },
            {
                text: 'Classes',
                icon: '<i class="bi bi-book"></i>',
                route: '/dashboard/classes',
                isCurrent: false
            },
            {
                text: 'Students',
                icon: '<i class="bi bi-people-fill"></i>',
                route: '/dashboard/students',
                isCurrent: false
            },
            {
                text: 'Staff',
                icon: '<i class="bi bi-people-fill"></i>',
                route: '/dashboard/staffs',
                isCurrent: false
            },
            {
                text: 'Results',
                icon: '<i class="bi bi-collection"></i>',
                route: '/dashboard/results',
                isCurrent: false
            },
            {
                text: 'Finances',
                icon: '<i class="bi bi-currency-exchange"></i>',
                route: '/dashboard/finances',
                isCurrent: false
            },
            {
                text: 'Fees',
                icon: '<i class="bi bi-cash-coin"></i>',
                route: '/dashboard/fees',
                isCurrent: false
            },
            {
                text: 'Subjects',
                icon: '<i class="bi bi-journal-text"></i>',
                route: '/dashboard/subjects',
                isCurrent: false
            },
            {
                text: 'Settings',
                icon: '<i class="bi bi-gear"></i>',
                route: '/dashboard/settings',
                isCurrent: false,
            },
            {
                text: 'Finances',
                icon: '<i class="bi bi-cash-coin"></i>',
                route: '/dashboard/finances',
                isCurrent: false
            },
            {
                text: 'Fees',
                icon: '<i class="bi bi-cash"></i>',
                route: '/dashboard/fees',
                isCurrent: false
            }

        ];

        menu = menu.concat(schoolStaffMenu);

    } else if (user.isStudent) {
        const studentMenu = [
            {
                text: 'Results',
                icon: '<i class="bi bi-collection"></i>',
                route: '/dashboard/results',
                isCurrent: false
            },
            {
                text: 'Fee Payments',
                icon: '<i class="bi bi-cash"></i>',
                route: '/dashboard/fee-payments',
                isCurrent: false
            },
            {
                text: 'Notice Board',
                icon: '<i class="bi bi-info-circle"></i>',
                route: '/dashboard/notice-board',
                isCurrent: false
            },
            {
                text: 'Classes',
                icon: '<i class="bi bi-book"></i>',
                route: '/dashboard/classes',
                isCurrent: false
            }
        ];

        menu = menu.concat(studentMenu);

    }

    const paths = pathname.split('/');
    if (paths[paths.length - 1] == '') {
        paths.pop();
    }

    let isCurrentMenuItem;
    if (paths.length === 2) {
        isCurrentMenuItem = paths[1];
    } else {
        isCurrentMenuItem = paths[2];
    }

    for (let index = 0; index < menu.length; index++) {
        const item = menu[index].route.slice(menu[index].route.lastIndexOf('/') + 1);

        if (isCurrentMenuItem === item) {
            menu[index].isCurrent = true;

            break;
        }
    }

    return menu;

};