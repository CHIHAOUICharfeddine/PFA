import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {AngularFire , FirebaseListObservable} from 'angularfire2' ;
import 'rxjs/Rx' ;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //email:any ;
  a:any;
  email ; 
  uid;
  users : FirebaseListObservable<any> ;
  constructor(public navCtrl: NavController, public angFire:AngularFire, public navParam : NavParams) {
    //this.a="";
    //this.email="";
     
    this.navCtrl=navCtrl ;
    this.navParam = navParam ;
          this.users = angFire.database.list('/userData') ;
     // let currentuser = window.localStorage.getItem('currentuser');
     // this.currentuser = this.navParam.get('currentuser') ;
      //this.a=JSON.parse(currentuser);
      //this.email = this.a.email ;
      //console.log(currentuser);
     
       //this.a = JSON.parse(currentuser);
       //console.log(currentuser) ;
      //console.log(this.a);      
      this.email = window.localStorage.getItem('email');
      this.uid = window.localStorage.getItem('uid');
      console.log(this.email) ;
      
    
  }
 
  
}
