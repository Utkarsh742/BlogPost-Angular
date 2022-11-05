// import {FormGroup, FormControl} from '@angular/forms'
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router'

// import { HttpserviceService } from '../httpservice.service'

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css'],
// })
// export class SignupComponent implements OnInit {
//   currentUser!: string
//   currentUserURL = 'http://localhost:3000/currentUser/1'
//   usersURL = 'http://localhost:3000/users'


//   constructor(private loginService: HttpserviceService) {}

//   ngOnInit(): void {}

//   loginForm = new FormGroup({
//     username: new FormControl(''),
//     password: new FormControl(''),
//   })

//   loginUser() {
    

//   }

//   // goToRegister() {
//   //   this.router.navigate(['/register']);
//   // }
// }

import {FormGroup, FormControl, Validators} from '@angular/forms'
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
  currentUserURL = 'http://localhost:3000/currentUser/1'; // URL listing current user
  usersURL = 'http://localhost:3000/users'; // URL listing all users

  constructor(private loginService: HttpserviceService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
    this.http.delete(this.currentUserURL).subscribe(
        () => console.log('Current User List Cleared'),
        (err) => console.log(err)
    );
    this.http.get<any>(this.usersURL).subscribe(
        (res) => {
            const user = res.find((a: any) => {
                return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password;
            });
            if (user) {
                this.http.post<any>('http://localhost:3000/currentuser', this.loginForm.value).subscribe(res);
                console.log(this.loginForm.value);
                this.router.navigate(['/home']);
                this.loginForm.reset();
            } else {
                alert('Invalid credentials');
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

  // goToRegister() {
  //   this.router.navigate(['/register']);
  // }
}
