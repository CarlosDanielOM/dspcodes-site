import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCodesComponent } from './access-codes.component';

describe('AccessCodesComponent', () => {
  let component: AccessCodesComponent;
  let fixture: ComponentFixture<AccessCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
