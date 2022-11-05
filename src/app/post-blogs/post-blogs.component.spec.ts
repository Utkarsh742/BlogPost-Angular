import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBlogsComponent } from './post-blogs.component';

describe('PostBlogsComponent', () => {
  let component: PostBlogsComponent;
  let fixture: ComponentFixture<PostBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostBlogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
