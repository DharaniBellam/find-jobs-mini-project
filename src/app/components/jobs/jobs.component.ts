import { CommonModule } from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Jobs } from '../../interfaces/jobs.interface';
import { JobsServiceService } from '../../services/jobs-service.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
  imports: [HttpClientModule, CommonModule, DashboardComponent, RouterLink, RouterLinkActive, RouterOutlet],
  providers: [JobsServiceService]
})
export class JobsComponent implements OnInit, OnDestroy {
  @Input() componentType = 'jobsComponent';
  private destroy$: Subject<void> = new Subject<void>();
  public faviourites: number[] = [];
  public filteredJobList: Jobs[] | undefined;
  public jobList: Jobs[] | undefined;
  public message: string | undefined = "Select a record to see the Faviourites";
  public starId: number | undefined;

  constructor(public router: Router, public jobsServiceService: JobsServiceService) { }

  ngOnInit(): void {
    this.getJobs();
  }
  public setFilteredJobList() {
    let favList = this.jobsServiceService.getItem("faviourites");

    if (this.componentType === 'favouritesComponent') {
      this.filteredJobList = this.jobList?.filter((data) => {
        return favList?.indexOf(data.id.toString()) !== -1;
      });

      if (this.filteredJobList?.length == 0 || favList == null) {
        this.message = "No faviourite selected";
      } else {
        this.message = ""
      }
    } else if (this.componentType === 'jobsComponent') {
      this.filteredJobList = this.jobList;
      this.filteredJobList?.filter((data) => {
        if (favList?.indexOf(data.id.toString()) !== -1) {
          if (data.id) {
            data.hasActive = (favList?.indexOf(data.id.toString()) !== -1);
          }
        }
      });
    }

  }

  public addToFavourites(item: Jobs) {

    if (this.filteredJobList?.filter((data) => {
      if (data?.hasActive) {
        this.faviourites.push(data.id);
      }
      if (data.id == item.id) {
        data.hasActive = !data.hasActive
        if (data.hasActive) {
          this.faviourites.push(item.id);
        }
        else if (!data.hasActive) {
          const index = this.faviourites.indexOf(item.id);
          if (index > -1) {
            this.faviourites.splice(index, 1);
          }
        }
      }
    }))

      this.faviourites = [...new Set(this.faviourites)];
    var storeFaviourites = JSON.stringify(this.faviourites);
    this.jobsServiceService.setItem("faviourites", storeFaviourites);

  }

  private getJobs() {
    this.jobsServiceService.getJobs().pipe(takeUntil(this.destroy$)).subscribe((res: Jobs[]) => {
      this.jobList = res;
      this.jobsServiceService.getJobsList(res);
      this.setFilteredJobList();
    })
  }
  public goToJobDescription(id: number) {
    this.router.navigate(['/jobs', id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
