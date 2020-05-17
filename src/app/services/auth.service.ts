import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: Observable<firebase.User>;
  authState: any = null;
  name: string;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
    angularFireAuth.authState.subscribe(authState => {
      this.authState  = authState;
    })
  }

  /* Sign up */
  SignUp(email: string, fullname: string, password: string) {
    this.angularFireAuth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      res.user.updateProfile({
        displayName: fullname
      }).then(res => console.log(res)).catch();
      console.log('You are Successfully signed up!', res);
    })
    .catch(error => {
      console.log('Something is wrong:', error.message);
    });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      this.authState = res.user;
      console.log('You are Successfully logged in!');
    })
    .catch(err => {
      console.log('Something is wrong:',err.message);
    });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
    .signOut();
    this.authState = null;
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get usersData(): any {
    if ( ! this.isAuthenticated ) {
      return [];
    }
    return {
      id: this.authState.uid,
      displayName: this.authState.displayName,
      email: this.authState.email,
      phoneNumber: this.authState.phoneNumber,
      photoURL: this.authState.photoURL,
    };
  }

}
