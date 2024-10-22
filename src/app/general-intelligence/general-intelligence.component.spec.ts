import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralIntelligenceComponent } from './general-intelligence.component';

describe('GeneralIntelligenceComponent', () => {
  let component: GeneralIntelligenceComponent;
  let fixture: ComponentFixture<GeneralIntelligenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralIntelligenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralIntelligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
