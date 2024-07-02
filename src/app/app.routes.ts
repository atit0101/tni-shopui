import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { DefaultComponent } from './layout/default/default.component';
import { ShowitemComponent } from './views/showitem/showitem.component';
export const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "detail",
        component: ShowitemComponent
      }
    ]

  }
];
