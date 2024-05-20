import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCodeViewerComponent } from './address-code-viewer.component';

describe('AddressCodeViewerComponent', () => {
  let component: AddressCodeViewerComponent;
  let fixture: ComponentFixture<AddressCodeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressCodeViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressCodeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
