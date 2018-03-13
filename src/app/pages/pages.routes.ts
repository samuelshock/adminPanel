import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBars'} },
            { path: 'graficas1', component: Graficas1Component, data: { title: 'Graficas'} },
            { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de tema'} },
            { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de Usuario'} },

            // mantenimientos
            { path: 'usuarios', component: UsersComponent, data: { title: 'Mantenimiento de Usuarios'} },
            { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de Hospitales'} },
            { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Medicos'} },
            { path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar Medico'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
