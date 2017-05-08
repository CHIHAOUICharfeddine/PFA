import { Component } from '@angular/core';

import { NavController ,NavParams } from 'ionic-angular';



@Component({
  selector: 'details',
  templateUrl: 'details.html'
 
})
export class DetailsPage {
      video ;

  constructor(public navCtrl: NavController , public navparams: NavParams) {
        
        
        this.navCtrl=navCtrl;
        this.navparams=navparams;
        this.video = this.navparams.get('video');
        console.log(this.video.title) ;
        console.log(this.video.logo) ;
  }

  

}
