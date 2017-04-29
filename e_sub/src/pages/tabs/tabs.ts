import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {LoginPage} from '../login/login';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController) {
   // window.localStorage.removeItem('currentuser');
      if (!this.isLoggedin()) {
        console.log('Not logged ') ;
        this.navCtrl.push(LoginPage);
      }
  }

  isLoggedin(){
    if (window.localStorage.getItem('currentuser')) {
      return true ;
    }

  }
}
