import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesViewComponent } from './codes-view.component';

describe('CodesViewComponent', () => {
  let component: CodesViewComponent;
  let fixture: ComponentFixture<CodesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
