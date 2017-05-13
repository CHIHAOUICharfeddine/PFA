import { Component } from '@angular/core';
import {HomePage} from '../home/home' ;
import {DetailsPage} from '../details/details' ;
import {DetailsPage1} from '../details1/details' ;
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire , FirebaseListObservable} from 'angularfire2' ;
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';
import 'rxjs/Rx' ;

/**
 * Generated class for the Videos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class Videos {
   a = [];
   score =0;
   video1 ;
   video;
   tabBarElement: any;
   //c = [];
  email ; 
  uid;

 constructor(public navCtrl: NavController, public angFire:AngularFire, public navParam : NavParams,public alertCtrl: AlertController) {
   this.tabBarElement = document.querySelector('.tabbar');
        this.tabBarElement.style.display = 'flex';
     this.navCtrl=navCtrl ;
    this.navParam = navParam ;
    this.video1 = this.navParam.get('a');
   // this.score =parseInt(this.navParam.get('score'));
  
      if(this.video1!="ok"){
      
     firebase.database().ref('video').on('child_added',(snapshot) => {
       
        this.a.push(snapshot.val()) ;
       //console.log(this.a);
     });
      }
      else {
          
        firebase.database().ref('video2').on('child_added',(snapshot) => {
       
        this.a.push(snapshot.val()) ;
        //console.log(this.a);
     });
      }

     firebase.database().ref('video/').once('value', function(snap){
       let c = JSON.stringify(snap.val()) ;
    //console.log(JSON.stringify(snap.val()));
    //console.log(c);
})


 }

 selectedVid(video){
   if(this.video1!="ok"){
   this.navCtrl.setRoot(DetailsPage , {video:video});
   } else {
     this.navCtrl.push(DetailsPage1 , {video:video});
   }
 }
  
ngAfterViewInit(){
 this.score =parseInt(window.localStorage.getItem('score'));
    console.log(this.score);
    if((this.score<=100)&&(this.video1=="ok")){
        this.showAlert();
          this.navCtrl.setRoot(HomePage);
          console.log('ok');
}}

 showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Easy first!',
      subTitle: 'You have to get more then 100 point in easy to access this level!',
      buttons: ['OK']
    });
    alert.present();
  }


 // ionViewDidLoad() {
   // console.log('ionViewDidLoad Videos');
  //}

}
