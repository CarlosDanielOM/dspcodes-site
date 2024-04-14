import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() modified: any = new EventEmitter();
  @Output() deleted: any = new EventEmitter();

  codeForm = this.fb.group({
    address: ['', Validators.required],
    code: ['', [Validators.required, Validators.minLength(3)]],
    submitter: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+\s[a-zA-Z]+/)]]
  });


  showForm: boolean = false;
  editMode: boolean = false;

  editId: string = ''
  
  newCodeData = {};
  
  constructor(
    private fb: FormBuilder,
    private codesService: CodesService
  ) {}

  ngOnInit() {
  }
  
  onSubmit() {
    if(this.codeForm.valid && this.lockers && !this.editMode) {
      this.codesService.createLockerCode(this.codeForm.value).subscribe(locker => this.codes.push(locker));
    }
    if(this.codeForm.valid && this.access && !this.editMode) {
      this.codesService.createAccessCode(this.codeForm.value).subscribe(access => this.codes.push(access));
    }

    if(this.codeForm.valid && this.editMode) {
      let data = {
        address: this.codeForm.get('address')!.value,
        code: this.codeForm.get('code')!.value,
        submitter: this.codeForm.get('submitter')!.value,
        _id: this.editId
      }
      this.modified.emit(data);
    }

    this.codeForm.reset();
    this.editMode = false
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
  
  startEditCode(code: any) {
    let data = {
      address: code.address,
      code: code.code,
      submitter: code.submitter
    }
    this.codeForm.patchValue(data);
    this.editId = code._id;
    this.editMode = true;
    this.showForm = true;
  }
  
  deleteCode(code: any) {
    let action = confirm('Are you sure you want to delete this?');
    if(!action) return;
    this.deleted.emit(code);
  }
  
}
