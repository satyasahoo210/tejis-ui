import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDSIComponent } from './search-dsi.component';

describe('SearchDSIComponent', () => {
  let component: SearchDSIComponent;
  let fixture: ComponentFixture<SearchDSIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDSIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDSIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
