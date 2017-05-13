import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {AngularFire , FirebaseListObservable} from 'angularfire2' ;
import firebase from 'firebase';
import 'rxjs/Rx' ;
import * as $ from 'jquery';
import {Videos} from '../videos/videos';
import {Videos1} from '../videos1/videos';
import {SplashScreen} from '@ionic-native/splash-screen' ;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //email:any ;
  
  score =[];
  score1 =0;
  email ;
  //i = -1 ; 
  uid;
  
  constructor(public navCtrl: NavController, public angFire:AngularFire, public navParam : NavParams , public splashScreen:SplashScreen) {
   //window.localStorage.removeItem('score');
         //this.score = parseInt(window.localStorage.getItem('score'));
      
     
       
        
    
    
    this.navCtrl=navCtrl ;
    this.navParam = navParam ;
      
  }

  govideos(){
    this.navCtrl.push(Videos);
  }

  govideos1(){
     var user = firebase.auth().currentUser;
    if (user != null) {
      this.email = user.email ;
      this.uid = user.uid;  
    }

    firebase.database().ref('users/'+this.uid+'/score/').once('value',(snapshot) => {
       
        this.score.push(snapshot.val()) ;
        //console.log(this.score[0]);
        //this.a=parseInt(this.score[0]);
        window.localStorage.setItem("score",this.score[0]);
     });
    this.navCtrl.push(Videos,{a:"ok"});
  }
  
ngAfterViewInit(){
this.splashScreen.hide();

}
ionViewWillLeave(){
 
}
  
  
  // If we use [diabled]="isValidForm" 
     /*  isValidForm(){
     if (this.i==1) {
       return true ; 
      
     } else {
       return false;}
  }

  isValidForm2(){
     if (this.score>100) {
       return true ; 
      
     } else {
       return false;}
  } */  
}
