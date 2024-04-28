import { Routes } from '@angular/router';
import { CodesComponent } from './codes/codes.component';
import { CodesViewComponent } from './codes-view/codes-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LockerCodesComponent } from './locker-codes/locker-codes.component';
import { AccessCodesComponent } from './access-codes/access-codes.component';

export const routes: Routes = [
    {path: '', redirectTo: "/codes/access", pathMatch: "full"},
    {path: 'dashboard', component: DashboardComponent, title: "Dashboard"},
    {path: 'codes', component: CodesComponent, children: [
        {path: '', component: CodesViewComponent},
        {path: 'lockers', component: LockerCodesComponent, title: "Locker Codes"},
        {path: 'access', component: AccessCodesComponent, title: "Access Codes"}
    ]}
];
