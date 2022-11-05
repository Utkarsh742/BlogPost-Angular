import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpserviceService } from '../httpservice.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allBlogs: any;
  currentUser: any = []
  API_URL = 'http://localhost:3000'
  
  constructor(private router: Router, private http: HttpClient, private loginService: HttpserviceService) {}

  ngOnInit() : void {
    const currentUser = this.loginService.list(`${this.API_URL}/currentUser/1`).subscribe(
      (res) => {
        this.currentUser = res;
      },
      (err) => {
        console.log(err)
      }
    )

    this.http.get(`${this.API_URL}/blogPosts`).subscribe(
      (data) => {
        this.allBlogs = data as string[] 
      },
      (err: HttpErrorResponse) => {
        console.log(err.message)
      }
    )

  }

  postNewBlogPage() {
    if(this.currentUser.id === 1) {
      this.router.navigate(['/post'])
    } else {
      alert("You must be logged in to create new blog") 
      this.router.navigate(['/login'])
    }
  }

}
