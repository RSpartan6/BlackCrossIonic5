import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  usuario;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private statusBar: StatusBar,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Se inicio la App");
      this.storage.get("userData").then((data) => {
        this.usuario = data;
        console.log("user :", data);
        if (data !== null) {

          if (this.usuario.respuesta.idRol === 1) {
            console.log("Usuario Entrenador");
            this.navCtrl.navigateRoot('/admin');

          } else

            if (this.usuario.respuesta.idRol=== 2) {
              console.log("Usuario Cliente",)
              this.navCtrl.navigateRoot('/calalumno');
            }          
        }
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
