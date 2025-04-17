import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Miembros',
    title: true
  },
  {
    name: 'Registrar Miembros',
    url: '/members/add',
    iconComponent: { name: 'cil-user-follow' }
  },
  {
    name: 'Miembros',
    url: '/members',
    iconComponent: { name: 'cil-list' }
  },
  {
    name: 'Administracion',
    title: true,
    roles: ['admin'],
  },
  {
    name: 'Mantenimientos',
    url: '/locations',
    iconComponent: { name: 'cil-settings' },
    roles: ['admin'],
    children: [
      {
        name: 'Provincias',
        url: '/locations/provinces'
      },
      {
        name: 'Municipios',
        url: '/locations/municipality'
      },
      {
        name: 'Region',
        url: '/locations/region'
      },
      {
        name: 'Zona',
        url: '/locations/zone'
      }
    ]
  },
  {
    name: 'Usuarios',
    url: '/access',
    iconComponent: { name: 'cil-user' },
    roles: ['admin'],
    children: [
      {
        name: 'Crear Usuarios',
        url: '/access/users/add'
      },
      {
        name: 'Usuarios',
        url: '/access/users'
      },
      // {
      //   name: 'Roles',
      //   url: '/access/roles'
      // },
      // {
      //   name: 'Coordinadores',
      //   url: '/access/cordinator'
      // }
    ]
  }
];
