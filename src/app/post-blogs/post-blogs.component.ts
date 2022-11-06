import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from '../httpservice.service'

@Component({
  selector: 'app-post-blogs',
  templateUrl: './post-blogs.component.html',
  styleUrls: ['./post-blogs.component.css']
})
export class PostBlogsComponent implements OnInit {
  currentUser: any = []
  blogURL: string = 'http://localhost:3000/blogPosts';

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private loginService: HttpserviceService
    ) { }

    blogForm = new FormGroup({
      blogUser: new FormControl(''),
      blogTitle: new FormControl(''),
      blogContent: new FormControl('')
    })

  ngOnInit(): void {
    const currentUser = this.loginService.list('http://localhost:3000/currentuser/1').subscribe(
      (response) => {
        this.currentUser = response;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  submitBlog() {
    if (this.currentUser.username === this.blogForm.value.blogUser) {
      this.http.post<any>(this.blogURL, this.blogForm.value).subscribe(
          (res) => {
              this.blogForm.reset();
              alert(`Posted Blog as ${this.currentUser.username}`);
              this.router.navigate(['/home']);
          },
          (error) => {
              console.log(error);
          }
      );
    } else {
        alert('Enter vlaid username');
    }
  }

}
