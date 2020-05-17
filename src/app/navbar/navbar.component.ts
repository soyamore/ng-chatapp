import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  connected = false;
  userData = null;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.connected = this.authService.isAuthenticated;
    this.userData = this.authService.userData;
  }

  logOut() {
    this.authService.SignOut();
    this.redirectTo('/login');
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(
      ()=> this.router.navigate([uri])
    );
  }


}
