import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {AngularFireModule} from 'angularfire2'
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import {RegisterPage} from '../pages/register/register';
import {Youtube} from '../pipes/youtube';
import {Videos} from '../pages/videos/videos';
import {DetailsPage} from '../pages/details/details' ;


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDYF-KRuAGQ9tv92obd-H1N-oZ_Z1GzzS0",
    authDomain: "esub-70731.firebaseapp.com",
    databaseURL: "https://esub-70731.firebaseio.com",
    projectId: "esub-70731",
    storageBucket: "esub-70731.appspot.com",
    messagingSenderId: "155186679368"
  };

 

@NgModule({
  declarations: [
    MyApp,
    DetailsPage,
    Videos,
    Youtube,
    AboutPage,
    LoginPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsPage,
    Videos,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
