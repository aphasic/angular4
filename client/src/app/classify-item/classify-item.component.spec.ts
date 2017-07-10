import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyItemComponent } from './classify-item.component';

describe('ClassifyItemComponent', () => {
  let component: ClassifyItemComponent;
  let fixture: ComponentFixture<ClassifyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
