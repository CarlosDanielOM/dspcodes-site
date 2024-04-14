import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesViewerComponent } from './codes-viewer.component';

describe('CodesViewerComponent', () => {
  let component: CodesViewerComponent;
  let fixture: ComponentFixture<CodesViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodesViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
