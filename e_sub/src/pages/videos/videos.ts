import { Component } from '@angular/core';
import {DetailsPage} from '../details/details' ;
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire , FirebaseListObservable} from 'angularfire2' ;
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
   //c = [];
  email ; 
  uid;

 constructor(public navCtrl: NavController, public angFire:AngularFire, public navParam : NavParams) {
     this.navCtrl=navCtrl ;
    this.navParam = navParam ;
     firebase.database().ref('video').on('child_added',(snapshot) => {
       
        this.a.push(snapshot.val()) ;
        console.log(this.a);
     });


     firebase.database().ref('video/').once('value', function(snap){
       let c = JSON.stringify(snap.val()) ;
    console.log(JSON.stringify(snap.val()));
    console.log(c);
})


 }

 selectedVid(video){
   this.navCtrl.push(DetailsPage , {video:video});
 }
  

 // ionViewDidLoad() {
   // console.log('ionViewDidLoad Videos');
  //}

}
