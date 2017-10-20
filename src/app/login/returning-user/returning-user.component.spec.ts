import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturningUserComponent } from './returning-user.component';

describe('ReturningUserComponent', () => {
  let component: ReturningUserComponent;
  let fixture: ComponentFixture<ReturningUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturningUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturningUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
