import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseInfoComponent } from './nurse-info.component';

describe('NurseInfoComponent', () => {
  let component: NurseInfoComponent;
  let fixture: ComponentFixture<NurseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
