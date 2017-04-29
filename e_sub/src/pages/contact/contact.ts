import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProviders, AuthMethods, AngularFire , FirebaseListObservable} from 'angularfire2' ;
import { AuthService } from '../../providers/auth-service';
import {TabsPage} from '../tabs/tabs';
import {LoginPage} from '../login/login';
import firebase from 'firebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
email ; 
  uid;
  num ;
  score = [] ;
  score1 ;
  constructor(public navCtrl: NavController, public angfire: AngularFire,public authService: AuthService) {
      this.email = window.localStorage.getItem('useremail');
      //this.score=2;
     // this.uid = window.localStorage.getItem('useruid');
        
       
     var user = firebase.auth().currentUser;
var name, email, photoUrl, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  this.uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.

  
}
console.log(this.uid);


firebase.database().ref('users/'+this.uid).on('value',(snapshot) => {
       //console.log(snapshot.val());
       this.score.push(snapshot.val()) ;
       console.log(this.score[0]);
       //this.score1=this.score[0] ;
      });
      
  }

  logout(){
    this.authService.doLogout();
    window.localStorage.removeItem('currentuser');
    window.localStorage.removeItem('useremail');
    window.localStorage.removeItem('useruid');
    this.navCtrl.push(LoginPage);
  }
}

