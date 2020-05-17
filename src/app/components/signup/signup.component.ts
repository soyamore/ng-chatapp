import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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

}
