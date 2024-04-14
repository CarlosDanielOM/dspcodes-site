import { Injectable } from '@angular/core';
import { LinksService } from './links.service';
import { HttpClient } from '@angular/common/http';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer DSPAUTHTOKEN'
  }
  
  constructor(
    private linksService: LinksService,
    private http: HttpClient
  ) { }

  getLockerCodes() {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/lockers`).pipe(map((res: any) => {
      return res.lockers.sort((a: any, b: any) => {
        return a.address.split(" ")[0] - (b.address.split(" ")[0]);
      })
    }));
  }

  getAccessCodes() {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/access`).pipe(map((res: any) => {
      return res.accessCodes.sort((a:any, b:any) => {
        return a.address.split(" ")[0] - b.address.split(" ")[0];
      });
    }))
  }

  getLockerCode(id: number) {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/lockers/${id}`).pipe(map((res: any) => res.locker))
  }

  getAccessCode(id: number) {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/access/${id}`).pipe(map((res: any) => res.locker))
  }

  createLockerCode(data: any) {
    return this.http.post(`${this.linksService.getApiUrl()}/codes/lockers`, data, { headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer DSPAUTHTOKEN'
    }}).pipe(map((res: any) => res.locker));
  }

  createAccessCode(data: any) {
    return this.http.post(`${this.linksService.getApiUrl()}/codes/access`, data, {headers: this.headers}).pipe(map((res: any) => res.accessCode));
  }
  
  deleteLockerCode(id: string) {
    return this.http.delete(`${this.linksService.getApiUrl()}/codes/lockers/${id}`, {headers: this.headers}).pipe(map((res: any) => res.locker));
  }

  deleteAccessCode(id: string) {
    return this.http.delete(`${this.linksService.getApiUrl()}/codes/access/${id}`, {headers: this.headers}).pipe(map((res: any) => res.accessCode));
  }
  
}
