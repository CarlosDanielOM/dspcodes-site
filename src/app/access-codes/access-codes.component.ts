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
  
  deletedCode(code: any) {
    this.codesService.deleteAccessCode(code._id).subscribe(deleted => {
      this.codes = this.codes.filter(code => code._id !== deleted._id)
    })
  }

  modifiedCode(code: any) {
    let id = code._id;
    delete code._id;
    this.codesService.updateAccessCode(code, id).subscribe(modefied => {
      this.codes = this.codes.map(code => code._id === modefied._id ? modefied : code);
    })
  }
  
}
