import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { JobsComponent } from '../jobs/jobs.component';

@Component({
    selector: 'app-favourites',
    standalone: true,
    templateUrl: './favourites.component.html',
    styleUrl: './favourites.component.css',
    imports: [DashboardComponent, JobsComponent]
})
export class FavouritesComponent {

}
