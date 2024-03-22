import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcPunchConfigurationComponent } from './pc-punch-configuration.component';

describe('PcPunchConfigurationComponent', () => {
  let component: PcPunchConfigurationComponent;
  let fixture: ComponentFixture<PcPunchConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PcPunchConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PcPunchConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
