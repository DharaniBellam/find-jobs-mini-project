import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobsDetails } from '../../../interfaces/jobsDetails.interface';
import { JobsServiceService } from '../../../services/jobs-service.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
  imports: [DashboardComponent, RouterOutlet, HttpClientModule, CommonModule,RouterLink],
  providers: [JobsServiceService]

})
export class JobDetailsComponent implements OnInit {
  public jobIdDetails: Observable<JobsDetails> | undefined;
  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, public jobsServiceService: JobsServiceService) {

  }
  ngOnInit(): void {
    let id = this.activateRoute.snapshot.paramMap.get('id');
    this.getJobDetails(id)
  }
  private getJobDetails(id: string | null) {
    this.jobIdDetails = this.jobsServiceService.getJobDetails(id)
  }

}
