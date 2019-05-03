import { Injectable } from '@angular/core';
import { RepoDetails } from '../models/repo-details';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http:HttpClient) {}
  
  getGithubRepositories(param:string,pageNo:number):Observable<RepoDetails> {
    let url = "https://api.github.com/search/repositories?q="+param+"&page="+pageNo;
    return this.http.get<any>(url);
   }
}
