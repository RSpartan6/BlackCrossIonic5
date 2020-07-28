import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor
    (
      private navCtrl: NavController,
      private storage: Storage,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController
    ) { }

  ngOnInit() {
  }

  caladmin() {
    this.navCtrl.navigateRoot('/caladmin');
  }

  perfil() {
    this.navCtrl.navigateRoot('/perfil');
  }

  cerrarSesion() {

    this.storage.clear();
    console.log("Sesion Cerrada (storage clear)", this.storage);
    this.cerrandoSesion();
    this.navCtrl.navigateRoot('/login');
  }

  async cerrandoSesion() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      translucent: true,
      message: 'Cerrando sesion',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async confirmCerrar() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Seguro que desea cerrar sesión?',      
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.cerrarSesion();
            console.log('Aceptar');
          }
        }
      ]
    });

    await alert.present();
  }

}
