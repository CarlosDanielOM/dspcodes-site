import { Component } from '@angular/core';
import { CodesService } from '../codes.service';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CodesViewerComponent } from '../codes-viewer/codes-viewer.component';

@Component({
  selector: 'app-locker-codes',
  standalone: true,
  imports: [NgFor, HttpClientModule, CodesViewerComponent],
  templateUrl: './locker-codes.component.html',
  styleUrl: './locker-codes.component.scss'
})
export class LockerCodesComponent {
  codes: any[] = [];

  lockerType = true;
  
  constructor(
    private codesService: CodesService
  ) {}

  ngOnInit() {
    this.getCodes();
  }
  
  getCodes() {
    this.codesService.getLockerCodes().subscribe(codes => this.codes = codes);
  }
  
}
