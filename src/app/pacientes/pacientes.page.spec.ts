import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacientesPage } from './pacientes.page';

describe('PacientesPage', () => {
  let component: PacientesPage;
  let fixture: ComponentFixture<PacientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
