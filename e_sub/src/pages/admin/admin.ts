import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import 'rxjs/Rx' ;
import {TabsPage} from '../tabs/tabs';


@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
    url ;
    title;
    logo;
    rightans;
    wrongans;
    note ;
    id ;
  constructor(public navCtrl: NavController) {
        this.url="";
        this.title="";
        this.logo="";
        this.rightans="";
        this.wrongans="";
        this.note="";
  }
  addvideo(){
      //var Gurl = document.getElementById("url") ;
      if((this.url.length==0)||(this.title.length==0)||(this.logo.length==0)||(this.rightans.length==0)||(this.wrongans.length==0)||(this.note.length==0)){
            alert("Unvalide !!!") ;
      }else {
      var url = this.url ;
      var title = this.title ;
      var logo = this.logo ;
      var rightans = this.rightans ;
      var wrongans = this.wrongans ;
      var note = this.note ;
      
      //console.log(url);
      var dbinsert = firebase.database().ref("video").push().set({url : url,title : title, logo : logo,trueans:rightans , wrongans:wrongans ,note:note});
      this.navCtrl.push(TabsPage);}
  }

  deletevideo() {
        var id=this.id ;
        var dbDelet = firebase.database().ref("video/").child(id).remove();
        this.navCtrl.push(TabsPage);
  }

}
