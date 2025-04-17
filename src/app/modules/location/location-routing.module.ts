import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'provinces',
    loadChildren: () => import('./provinces/provinces.module').then(m => m.ProvincesModule)
  },
  {
    path: 'municipality',
    loadChildren: () => import('./municipality/municipality.module').then(m => m.MunicipalityModule)
  },
  {
    path: 'region',
    loadChildren: () => import('./region/region.module').then(m => m.RegionModule)
  },
  {
    path: 'zone',
    loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
