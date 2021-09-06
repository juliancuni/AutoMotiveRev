import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOffsidebarComponent } from './private-offsidebar.component';

describe('PrivateOffsidebarComponent', () => {
  let component: PrivateOffsidebarComponent;
  let fixture: ComponentFixture<PrivateOffsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateOffsidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateOffsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
