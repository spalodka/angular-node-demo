import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjslearningComponent } from './rxjslearning.component';

describe('RxjslearningComponent', () => {
  let component: RxjslearningComponent;
  let fixture: ComponentFixture<RxjslearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjslearningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjslearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
