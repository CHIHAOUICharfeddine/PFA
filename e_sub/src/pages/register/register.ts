import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import {TabsPage} from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public registerForm;
  emailChanged: boolean = false;
  fullname ;
  passwordChanged: boolean = false;
  fullnameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  
  constructor(public navCtrl: NavController,private toastCtrl: ToastController, public authService: AuthService, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  doRegister(){
    this.submitAttempt = true;

    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      window.localStorage.setItem("fullname",this.fullname);
      //window.localStorage.setItem("fullname",this.registerForm.value.fullname);
      console.log(this.fullname) ;
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password).then( authService => {
        this.presentToast();
        this.navCtrl.push(TabsPage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
      
    }
  }

presentToast() {
    let toast = this.toastCtrl.create({
      message: 'You have signed in successfully !',
     duration : 5000 ,
      showCloseButton:true
    });
    toast.present();
  }

  
}