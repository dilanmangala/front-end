import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard/dashboard',
    title: 'Dashboard',
    icon: 'fa fa-dashboard',
    class: '',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [],
    parentId: 'PERM_VIEW_ALL_DASHBOARD'
  },
  {
    path: '',
    title: 'Administration',
    icon: 'fa fa-laptop',
    class: 'has-arrow',
    label: '',
    labelClass: '',
    extralink: false,
    submenu: [
      {
        path: '',
        title: 'User Role',
        icon: '',
        label: '',
        class: 'has-arrow',
        labelClass: '',
        extralink: false,
        submenu: [
          {
            path: '/user-role/add-user-role',
            title: 'Add User Role',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: [],
            parentId: 'PERM_CREATE_USER_ROLE'
          },
          {
            path: '/user-role/manage-user-role',
            title: 'Manage User Role',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: [],
            parentId: 'PERM_EDIT_USER_ROLES'
          }
        ],
        parentId: ''
      },
      {
        path: '',
        title: 'RPA Users',
        icon: '',
        label: '',
        class: 'has-arrow',
        labelClass: '',
        extralink: false,
        submenu: [
          {
            path: '/admin-users/add-admin-users',
            title: 'Add Users',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: [],
            parentId: 'PERM_CREATE_USER'
          },
          {
            path: '/admin-users/manage-admin-users',
            title: 'Manage Users',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: [],
            parentId: 'PERM_EDIT_UPDATE_USER'
          }
        ],
        parentId: ''
      },
      {
        path: '',
        title: 'Department',
        icon: '',
        label: '',
        class: 'has-arrow',
        labelClass: '',
        extralink: false,
        submenu: [
          {
            path: '/department/add-department',
            title: 'Add Department',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: [],
            parentId: 'PERM_CREATE_DEPARTMENT'
          },
          {
            path: '/department/manage-department',
            title: 'Manage Department',
            icon: '',
            class: '',
            label: '',
            labelClass: '',
            extralink: false,
            submenu: [],
            parentId: 'PERM_EDIT_UPDATE_DEPARTMENT'
          }
        ],
        parentId: ''
      }
      // ,
      // {
      //   path: "",
      //   title: "WorkFlow",
      //   icon: "",
      //   label: "",
      //   class: "has-arrow",
      //   labelClass: "",
      //   extralink: false,
      //   submenu: [
      //     {
      //       path: "/workflow/add-workflow",
      //       title: "Add WorkFlow",
      //       icon: "",
      //       class: "",
      //       label: "",
      //       labelClass: "",
      //       extralink: false,
      //       submenu: [],
      //       parentId: ""
      //     },
      //     {
      //       path: "/workflow/manage-workflow",
      //       title: "Manage WorkFlow",
      //       icon: "",
      //       class: "",
      //       label: "",
      //       labelClass: "",
      //       extralink: false,
      //       submenu: [],
      //       parentId: ""
      //     }
      //   ],
      //   parentId: ""
      // }
    ],
    parentId: ''
  }

];
