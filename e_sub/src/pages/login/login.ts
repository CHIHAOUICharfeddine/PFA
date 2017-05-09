import { Component } from '@angular/core';
import { NavController ,AlertController,Platform} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
import {AuthProviders, AuthMethods, AngularFire , FirebaseListObservable} from 'angularfire2' ;
import { ToastController } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {AdminPage} from '../admin/admin';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  tabBarElement: any;
  splash = true;
  users:FirebaseListObservable<any>;
  loader:any ;
  useruid:any ;
  user:any ;
  email:any;
  password:any ;
  err:string;
  constructor(public navCtrl: NavController ,public alertController:AlertController ,public loadingCtrl: LoadingController, public angfire: AngularFire, private toastCtrl: ToastController) {
  this.tabBarElement = document.querySelector('.tabbar');
   this.email="";
   this.err="";
   this.password="";
   this.users = this.angfire.database.list('/users');
    
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
  }


  mainpages(){
     //this.navCtrl.push(TabsPage);
      
  }
  
  
  onBlurMethod(){
    if(this.email.length==0){
        this.err="Enter Username";
    }else if(this.email.length<2){
        this.err="Username too short";
    } 
    
    else if(this.email.length>20){
        this.err="Username too long";
    }else { this.err="" ;}
   
  }


  //login method 
  login() {
    if(this.password.length==0){
      alert("Enter your password please");
    } else if((this.password=="admin")&&(this.email=="admin")){
      this.navCtrl.push(AdminPage);
    }
    else {
    this.angfire.auth.login({
      email: this.email,
      password: this.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password  
      }).then((response) => {
        this.user= response.auth.email ;
        this.useruid = response.auth.uid ;
        console.log(this.user);
        console.log('Login success' + JSON.stringify(response));
        let currentuser = {
          email: response.auth.email,
          picture: response.auth.photoURL
        };

        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        window.localStorage.setItem('useremail', this.user);
        window.localStorage.setItem('useruid', this.useruid);
         //window.localStorage.setItem('email', JSON.stringify(response.auth.email));
         //window.localStorage.setItem('uid', JSON.stringify(response.auth.uid));
        this.navCtrl.pop();
      }).catch((error) => {
        //alert("Invalide Email or Password") ;
        this.presentToast();
    })
  }
}


//Facebook login 
fblogin() {
    this.angfire.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with facebook' + JSON.stringify(response));
      let currentuser = {
          email: response.auth.displayName,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.pop();
      }).catch((error) => {
        console.log(error);
    })
    
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Invalid Email or Password',
     
      showCloseButton:true
    });
    toast.present();
  }

  // sign in 
signin() {
  let prompt = this.alertController.create({
    title: 'User Registration ' ,
    message: 'Enter Email and Password',
    inputs: [
      {
        name:'email',
        placeholder:"Email..."
      },
      {
        name:'password',
        placeholder:"password..."
      }
    ],
    buttons: [
      {
        text : "Cancel" ,
        handler : data => {
          console.log("canceled") ;
        }
      } ,
       {
        text : "Register" ,
        handler : data => {
          this.users.push({
            email : data.email,
            password : data.password,
            score: "0"
          })
        }
      } ,
    ]
  });

  prompt.present();
}

gosign() {
  this.navCtrl.push(RegisterPage);
}
ngOnInit() {
  //window.location.reload();
  
  
} 
}
