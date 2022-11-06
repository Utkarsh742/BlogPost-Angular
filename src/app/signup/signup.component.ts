import { FormGroup, FormControl} from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

import { HttpserviceService } from '../httpservice.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  currentUser!: string;
  currentUserURL: string = 'http://localhost:3000/currentuser/1'
  usersURL: string = 'http://localhost:3000/users'

  constructor(
    private loginService: HttpserviceService, 
    private router: Router, 
    private http: HttpClient
    ) { }

  ngOnInit(): void {}

  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  })

  get f() {
    return this.loginForm.controls;
  }

  get username() {
    // getter for username
    return this.loginForm.get('username');
  }

  get password() {
      // getter for password
      return this.loginForm.get('password');
  }


  loginUser() {
    // login button
    this.http.delete('http://localhost:3000/currentuser/1').subscribe(
        () => console.log('Current User List Cleared'),
        (err) => console.log(err)
    );
    this.http.get<any>('http://localhost:3000/users').subscribe(
        (res) => {
            const user = res.find((a: any) => {
                return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password;
            });
            if (user) {
              this.http.post<any>('http://localhost:3000/currentuser', this.loginForm.value).subscribe(res);
              this.router.navigate(['/']);
              this.loginForm.reset();
          } else {    
              console.log('Invalid credentials')
          }
        },
        (err) => {
            alert('Something went wrong');
        }
    );
}

  goToRegister() {
    this.router.navigate(['/register'])

  }

}
