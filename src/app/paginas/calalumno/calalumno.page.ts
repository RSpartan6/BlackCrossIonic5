import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, LoadingController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { CalendarComponentOptions } from 'ion2-calendar';
import { LoginService } from 'src/app/servicios/login.service';



@Component({
  selector: 'app-calalumno',
  templateUrl: './calalumno.page.html',
  styleUrls: ['./calalumno.page.scss'],
})
export class CalalumnoPage implements OnInit {


  urlapi = "http://3.133.28.198:8080/Wod/";

  fecha
  fechaf
  date: string;
  type: 'string';
  usuario
  numeroUsuario: string;
  idUsuario: string;
  idRol
  listado
  nombre

  constructor
    (
      public alertController: AlertController,
      public navCtrl: NavController,
      private storage: Storage,
      private navParams: NavParams,
      private servicio: LoginService,
      private alertCtrl: AlertController,
      private loadingCtrl: LoadingController
    ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((data) => {
      this.usuario = data;
      console.log("user :", data);

      console.log("El usuario en CALENDARIO es :", this.usuario.respuesta.nombre);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      console.log("El Rol del usuario es : ", this.usuario.respuesta.idRol);
      console.log("El estatus del usuario es:", this.usuario.respuesta.estatus);

      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      this.idRol = this.usuario.respuesta.idRol;

    });
  }

  // onChange(date) {


  //   this.fecha = date._d;

  //   function format(d) {
  //     var mm = d.getMonth() + 1; // getMonth() is zero-based
  //     var dd = d.getDate();

  //     return [d.getFullYear(), '-',
  //     (mm > 9 ? '' : '0') + mm, '-',
  //     (dd > 9 ? '' : '0') + dd
  //     ].join('');
  //   };

  //   var fechaf = format(this.fecha);

  //   // this.navCtrl.navigateRoot('/asisalumno')

  //   console.log(fechaf)

  // }

  ngOnInit() {
  }

  onClick(date, fechaf) {

    this.fecha = date._d;
    console.log("Fecha seleccionada", this.fecha);

    function format(d) {
      var mm = d.getMonth() + 1; // getMonth() is zero-based
      var dd = d.getDate();

      return [d.getFullYear(), '-',
      (mm > 9 ? '' : '0') + mm, '-',
      (dd > 9 ? '' : '0') + dd
      ].join('');
    };

    fechaf = format(this.fecha);
    this.navCtrl.navigateRoot('/horarios/' + fechaf)
    console.log(fechaf)
  }

  options: CalendarComponentOptions = {
    monthPickerFormat: ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    disableWeeks: [0, 6]
  };

  // Cerrar sesión

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
  // Fin cerrar sesión

  atras() {
    this.navCtrl.navigateRoot('/admin');
  }

}
