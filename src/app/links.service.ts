import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor() { }

  getApiUrl(): String {
    return "https://api.dsp.carlosdaniel.info/v1";
  }
  
}
