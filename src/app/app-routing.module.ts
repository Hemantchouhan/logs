import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './helpers/auth.guard';
import { CreateEventsComponent } from './pages/create-events/create-events.component';
import { EventsComponent } from './pages/events/events.component';

const routes: Routes = [
{ path: 'login', component: LoginPageComponent },
{ path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
{ path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
{ path: 'create-events', component: CreateEventsComponent, canActivate: [AuthGuard] },
{ path: '',
    redirectTo: '/login',
    pathMatch: 'full' }
];

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }