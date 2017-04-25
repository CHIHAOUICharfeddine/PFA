import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import jQuery from "jquery";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  loader:any ;
  nom:string;
  err:string;
  constructor(public navCtrl: NavController , public loadingCtrl: LoadingController) {
   this.nom="";
   this.err="";
  }
  mainpages(){
     //this.navCtrl.push(TabsPage);
      
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
     //this.loader.dismiss();
    this.navCtrl.push(TabsPage);
  }
  
  onBlurMethod(){
    if(this.nom.length==0){
        this.err="Enter Username";
    }else if(this.nom.length<2){
        this.err="Username too short";
    } 
    
    else if(this.nom.length>20){
        this.err="Username too long";
    }else { this.err="" ;}
   
  }

}
