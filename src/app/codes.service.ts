import { Injectable } from '@angular/core';
import { LinksService } from './links.service';
import { HttpClient } from '@angular/common/http';
import { map, pipe } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  getLockerCodes() {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/lockers`).pipe(map((res: any) => {
      let lockersSorted = res.lockers.sort((a: any, b: any) => {
        return a.address.split(" ")[0] - (b.address.split(" ")[0]);
      })
      return lockersSorted.sort((a: any, b: any) => {
        return a.rejects - b.rejects;
      });
    }));
  }

  getAccessCodes() {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/access`).pipe(map((res: any) => {
      let addressSorted = res.accessCodes.sort((a:any, b:any) => {
        return a.address.split(" ")[0] - b.address.split(" ")[0];
      });
      return addressSorted.sort((a:any, b:any) => {
        return a.rejects - b.rejects;
      });
    }))
  }

  getAccessCodesForAddress(address: string) {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/access/${address}`).pipe(map((res: any) => res.accessCodes));
  }

  getLockerCodesForAddress(address: string) {
    return this.http.get(`${this.linksService.getApiUrl()}/codes/lockers/${address}`).pipe(map((res: any) => res.lockerCodes));
  }

  createLockerCode(data: any) {
    return this.http.post(`${this.linksService.getApiUrl()}/codes/lockers`, data, { headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer DSPAUTHTOKEN'
    }}).pipe(map((res: any) => {
      this.snackBar.open('Locker Code Created', 'OK', {duration: 3000})
      return res.locker
    }));
  }

  createAccessCode(data: any) {
    return this.http.post(`${this.linksService.getApiUrl()}/codes/access`, data, {headers: this.headers}).pipe(map((res: any) => {
      this.snackBar.open('Access Code Created', 'OK', {duration: 3000})
      return res.accessCode
    }));
  }
  
  deleteLockerCode(id: string) {
    return this.http.delete(`${this.linksService.getApiUrl()}/codes/lockers/${id}`, {headers: this.headers}).pipe(map((res: any) => {
      this.snackBar.open('Locker Code Deleted', 'OK', {duration: 3000})
      return res.locker
    }));
  }

  deleteAccessCode(id: string) {
    return this.http.delete(`${this.linksService.getApiUrl()}/codes/access/${id}`, {headers: this.headers}).pipe(map((res: any) => {
      this.snackBar.open('Access Code Deleted', 'OK', {duration: 3000})
      return res.accessCode
    }));
  }

  updateLockerCode(data: any, id: string) {
    return this.http.patch(`${this.linksService.getApiUrl()}/codes/lockers/${id}`, data, {headers: this.headers}).pipe(
      map((res: any) => {
        this.snackBar.open('Locker Code Updated', 'OK', {duration: 3000})
        return res.locker
      })
    );
  }

  updateAccessCode(data: any, id: string) {
    return this.http.patch(`${this.linksService.getApiUrl()}/codes/access/${id}`, data, {headers: this.headers}).pipe(
      map((res: any) => {
        this.snackBar.open('Access Code Updated', 'OK', {duration: 3000})
        return res.accessCode
      })
    );
  }
  
  accessCodeFailed(id: string, fails: number) {
    return this.http.patch(`${this.linksService.getApiUrl()}/codes/access/${id}`, {rejects: fails}, {headers: this.headers}).pipe(
      map((res: any) => {
        this.snackBar.open('Access Code Failed', 'OK', {duration: 3000})
        return res.accessCode
      })
    );
  }

  lockerCodeFailed(id: string, fails: number) {
    return this.http.patch(`${this.linksService.getApiUrl()}/codes/lockers/${id}`, {rejects: fails}, {headers: this.headers}).pipe(
      map((res: any) => {
        this.snackBar.open('Locker Code Failed', 'OK', {duration: 3000})
        return res.locker
      })
    );
  }
  
}
