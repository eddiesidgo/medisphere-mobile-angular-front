import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctoresPage } from './doctores.page';

describe('DoctoresPage', () => {
  let component: DoctoresPage;
  let fixture: ComponentFixture<DoctoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
