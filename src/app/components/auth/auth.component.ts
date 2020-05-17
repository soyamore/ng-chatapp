import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  email: string;
  password: string;
  fullname: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authService.SignUp(this.email, this.fullname, this.password);
    this.email = '';
    this.password = '';
    this.fullname = '';
  }

  signIn() {
    this.authService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  logOut() {
    this.authService.SignOut();
  }
}
