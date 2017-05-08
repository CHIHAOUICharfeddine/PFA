import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {AngularFire , FirebaseListObservable} from 'angularfire2' ;
import firebase from 'firebase';
import 'rxjs/Rx' ;
import {Videos} from '../videos/videos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //email:any ;
  a = [];
  email ; 
  uid;
  users : FirebaseListObservable<any> ;
  constructor(public navCtrl: NavController, public angFire:AngularFire, public navParam : NavParams) {
    //this.a="";
    //this.email="";
     
    this.navCtrl=navCtrl ;
    this.navParam = navParam ;
    
     // let  data = angFire.database.list('/video') ;
     // let currentuser = window.localStorage.getItem('currentuser');
     // this.currentuser = this.navParam.get('currentuser') ;
      //this.a=JSON.parse(currentuser);
      //this.email = this.a.email ;
      //console.log(currentuser);
      firebase.database().ref('video/0').on('value',(snapshot) => {
       //console.log(snapshot.val());
       this.a.push(snapshot.val()) ;
        //var url = snapshot.child('url').val();
       //var c = this.a[0].url ;
       //console.log(this.a[0].url);
       
       //this.score1=this.score[0] ;
      });
    
       //this.a = JSON.parse(currentuser);
       //console.log(currentuser) ;
      //console.log(this.a);      
      //this.email = window.localStorage.getItem('email');
      //this.uid = window.localStorage.getItem('uid');
      //console.log(this.email) ;
      
    
  }

  govideos(){
    this.navCtrl.push(Videos);
  }
 
  
}
