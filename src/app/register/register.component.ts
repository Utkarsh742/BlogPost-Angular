import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {HttpserviceService} from '../httpservice.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private loginService: HttpserviceService) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  goToLogin() {
    this.router.navigate(['/signup'])
  }

  registerUser() {
    this.http.post<any>('http://localhost:3000/users', this.registerForm.value).subscribe((_res) => {
      this.registerForm.reset();
      alert('Successfully registered!');
      this.goToLogin();
    });
  }
}
