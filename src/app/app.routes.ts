import { Routes } from '@angular/router';
import { CodesComponent } from './codes/codes.component';
import { CodesViewComponent } from './codes-view/codes-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LockerCodesComponent } from './locker-codes/locker-codes.component';
import { AccessCodesComponent } from './access-codes/access-codes.component';
import { AddressCodeViewerComponent } from './address-code-viewer/address-code-viewer.component';

export const routes: Routes = [
    {path: '', redirectTo: "/codes/access", pathMatch: "full"},
    {path: 'dashboard', component: DashboardComponent, title: "Dashboard"},
    {path: 'codes', component: CodesComponent, children: [
        {path: '', redirectTo: 'access', pathMatch: 'full'},
        {path: 'lockers', component: LockerCodesComponent, title: "Locker Codes", children: [
            {path: ':address', component: AddressCodeViewerComponent, title: "Codes" }
        ]},
        {path: 'access', component: AccessCodesComponent, title: "Access Codes", children: [
            {path: ':address', component: AddressCodeViewerComponent, title: "Codes" }
        ]}
    ]}
];
