import { Injectable } from '@angular/core';
import { LinksService } from './links.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodesService {

  constructor(
    private linksService: LinksService,
    private http: HttpClient
  ) { }

  getLockerCodes() {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/lockers`).pipe(map((res: any) => res.lockers));
  }

  getAccessCodes() {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/access`).pipe(map((res: any) => res.accessCodes))
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
    return this.http.post(`${this.linksService.getApiUrl()}/codes/access`, data, {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer DSPAUTHTOKEN'
    }}).pipe(map((res: any) => res.accessCode));
  }
  
}