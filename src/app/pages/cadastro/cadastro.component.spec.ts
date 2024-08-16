import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cadastroComponent } from './cadastro.component';

describe('cadastroComponent', () => {
  let component: cadastroComponent;
  let fixture: ComponentFixture<cadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [cadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
