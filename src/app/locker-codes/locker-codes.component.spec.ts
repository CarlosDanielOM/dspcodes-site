import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerCodesComponent } from './locker-codes.component';

describe('LockerCodesComponent', () => {
  let component: LockerCodesComponent;
  let fixture: ComponentFixture<LockerCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockerCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LockerCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
