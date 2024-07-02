import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowitemComponent } from './showitem.component';

describe('ShowitemComponent', () => {
  let component: ShowitemComponent;
  let fixture: ComponentFixture<ShowitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
