import { Component } from '@angular/core';

import { NavController ,NavParams ,AlertController } from 'ionic-angular';
import * as $ from 'jquery';
import {Videos} from '../videos/videos';
import firebase from 'firebase';
import 'rxjs/Rx' ;



@Component({
  selector: 'details',
  templateUrl: 'details.html'
 
})
export class DetailsPage {
     tabBarElement: any;
      video ;
      uid ;
      i ;
      name= [];
      email ;
      a:number ;
      score= [];
      ok:boolean ;
      
  constructor(public navCtrl: NavController , public navparams: NavParams , public alertController:AlertController) {
        this.tabBarElement = document.querySelector('.tabbar');
        this.tabBarElement.style.display = 'none';
        this.i = Math.floor(Math.random() * 50) + 1;
        /*if (this.i%2==0) {
            this.ok==true;
        }else{this.ok==false;}*/
        this.navCtrl=navCtrl;
        this.navparams=navparams;
        this.video = this.navparams.get('video');
        console.log(this.video.title) ;
        console.log(this.video.logo) ;
        console.log(this.i) ;
        var user = firebase.auth().currentUser;
    if (user != null) {
      this.email = user.email ;
      this.uid = user.uid;  
    }

    firebase.database().ref('users/'+this.uid+'/score/').on('value',(snapshot) => {
       
        this.score.push(snapshot.val()) ;
        console.log(this.score[0]);
        //this.a=parseInt(this.score[0]);
        window.localStorage.setItem("score",this.score[0]);
     });
  }

  changeColor(){
 
   
   $('#b3').hide();
   $('#x').hide(1000);
   $("#ans").css({visibility:'visible'});
   $("#ans").css({display:'block'});
   $('#b1').hide().toggle(1500);
    $('#b2').hide().toggle(1500);
  
  
  
}

  wrong(){
     $('#b1').css({color : 'red'});
      $('#b2').css({color : 'green'});
      $("#b1").attr("disabled", true);
     $("#b2").attr("disabled", true);

      $("#back").css({visibility:'visible'});
   $("#back").css({display:'block'});


     document.getElementById("r").innerHTML = '<div class="alert alert-danger" role="alert"><b>Ops ! </b><br><p>Your answer is <i>wrong</i> <br>Unfortunately we will take 5 points from your score<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></p></div>';
    let messa = this.video.note ; 
    let prompt = this.alertController.create({
    title: 'Wrong answer ...' ,
    message: messa,
  buttons: [
      {
        text : "Got it" ,
        handler : data => {
          console.log("canceled") ;
        }
      }]
    });
     prompt.present();

      let score = window.localStorage.getItem('score');
    console.log("okkk");
    var c = parseInt(score);
    c=c-5 ;
    console.log(score);
    var dbUpdate = firebase.database().ref("users/"+this.uid).update({score : c}) ;


  }

  right(){
    console.log("ok");
     $("#b1").attr("disabled", true);
     $("#b2").attr("disabled", true);
     $('#b2').css({color : 'green'});
     $('#b1').css({color : 'red'});

     $("#back").css({visibility:'visible'});
   $("#back").css({display:'block'});

    
    document.getElementById("r").innerHTML = '<div class="alert alert-success" role="alert"><stong>Well done ! </strong><br><p>You have +10 in your score <span class="glyphicon glyphicon-star" aria-hidden="true"></span></p></div>';

    
    /* firebase.database().ref('users/'+this.uid+'/name/').on('value',(snapshot) => {
       
        this.name.push(snapshot.val()) ;
        console.log(this.name[0]);
        
     }); */


    
    

   
    let score = window.localStorage.getItem('score');
    console.log("okkk");
    var c = parseInt(score);
    c=c+10 ;
    console.log(score);
    var dbUpdate = firebase.database().ref("users/"+this.uid).update({score : c}) ;

  }


  goback(){
    this.navCtrl.setRoot(Videos);

  }
}
