import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobsComponent } from '../app/components/jobs/jobs.component';
import { JobDetailsComponent } from './components/jobs/job-details/job-details.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

export const routes: Routes = [
    { path: '', redirectTo: 'jobs', pathMatch: 'full' },
    {path: 'jobs', loadComponent: () => import('../app/components/jobs/jobs.component').then(mod => mod.JobsComponent)},
    {path: 'jobs/:id', loadComponent: () => import('../app/components/jobs/job-details/job-details.component').then(mod => mod.JobDetailsComponent)},
    {path: 'favorites', loadComponent: () => import('./components/favourites/favourites.component').then(mod => mod.FavouritesComponent)},
    
];
