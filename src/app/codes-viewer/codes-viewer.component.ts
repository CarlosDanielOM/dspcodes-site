import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CodesService } from '../codes.service';

@Component({
  selector: 'app-codes-viewer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './codes-viewer.component.html',
  styleUrl: './codes-viewer.component.scss'
})
export class CodesViewerComponent {
  @Input() codes: any[] = []
  @Input() lockers: boolean = false;
  @Input() access: boolean = false;

  codeForm = this.fb.group({
    address: ['', Validators.required],
    code: ['', [Validators.required, Validators.minLength(3)]],
    submitter: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+\s[a-zA-Z]+/)]]
  });


  showForm: boolean = false;

  newCodeData = {};
  
  constructor(
    private fb: FormBuilder,
    private codesService: CodesService
  ) {}

  ngOnInit() {
  }
  
  onSubmit() {
    if(this.codeForm.valid && this.lockers) {
      this.codesService.createLockerCode(this.codeForm.value).subscribe(locker => this.codes.push(locker));
    }
    if(this.codeForm.valid && this.access) {
      this.codesService.createAccessCode(this.codeForm.value).subscribe(access => this.codes.push(access));
    }
    this.codeForm.reset();
    this.showForm = false;
  }
  
  get address() {
    return this.codeForm.get('address')
  }
  
  get code() {
    return this.codeForm.get('code')
  }

  get submitter() {
    return this.codeForm.get('submitter')
  }
  
  showFormBtn() {
    this.showForm = true;
  }
  
  deleteCode(code: any) {
    let action = confirm('Are you sure you want to delete this?');
    if(!action) return;
    if(this.lockers) {
      this.codesService.deleteLockerCode(code._id).subscribe();
    }
    if(this.access) {
      this.codesService.deleteAccessCode(code._id).subscribe();
      
    }
    this.codes = this.codes.filter(c => c._id !== code._id);
  }
  
}
