import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
public fireAuth: any;
public userData: any;
fullname : string ;
static i : number ;
i=0 ;
  constructor() {
    this.fireAuth = firebase.auth();
  this.userData = firebase.database().ref('/users');
  }


register(email: string, password: string): any {
  
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      let fullname = window.localStorage.getItem("fullname").toString();
      console.log(fullname);
      this.userData.child(newUser.uid).set({email: email,score : 0,name : fullname});
      this.i++ ;
     //this.writeUserData(newUser.uid,name,email);
    });
}

writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    email: email
    
  });
}

doLogout(): any {
  return this.fireAuth.signOut();
}


}
