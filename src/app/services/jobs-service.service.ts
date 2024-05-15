import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jobs } from '../interfaces/jobs.interface';
import { Observable } from 'rxjs';
import { JobsDetails } from '../interfaces/jobsDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class JobsServiceService {

  isFavIconSelected = "";
  public faviourites: number[] = [];


  public jobList: Jobs[] | undefined;

  constructor(private http: HttpClient) { }

  public getJobs(): Observable<Jobs[]> {
    return this.http.get<Jobs[]>('jobs');
  }

  public getJobsList(data: Jobs[]) {
    return this.jobList = data;
  }

  public getJobDetails(id: string | null): Observable<JobsDetails> {
    return this.http.get<JobsDetails>('jobs/' + id);
  }

  public setItem(setName: string,storeFaviourites: string) {
    localStorage.setItem(setName, storeFaviourites);

  }

  public getItem(getItem: string) {
    return localStorage.getItem(getItem);
  }

  public clear() {
    return localStorage.clear();
  }
}
