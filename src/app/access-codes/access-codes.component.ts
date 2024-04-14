import { Component } from '@angular/core';
import { CodesService } from '../codes.service';
import { CommonModule } from '@angular/common';
import { CodesViewerComponent } from '../codes-viewer/codes-viewer.component';

@Component({
  selector: 'app-access-codes',
  standalone: true,
  imports: [CommonModule, CodesViewerComponent],
  templateUrl: './access-codes.component.html',
  styleUrl: './access-codes.component.scss'
})
export class AccessCodesComponent {
  codes: any[] = [];

  accessType = true;
  
  constructor(
    private codesService: CodesService
  ) {}

  ngOnInit() {
    this.codesService.getAccessCodes().subscribe(codes => {
      this.codes = codes
    });
  }
  
}
