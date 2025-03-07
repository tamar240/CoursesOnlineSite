import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataCourseComponent } from './updata-course.component';

describe('UpdataCourseComponent', () => {
  let component: UpdataCourseComponent;
  let fixture: ComponentFixture<UpdataCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdataCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdataCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
