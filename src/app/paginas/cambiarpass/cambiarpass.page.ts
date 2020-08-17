import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-cambiarpass',
  templateUrl: './cambiarpass.page.html',
  styleUrls: ['./cambiarpass.page.scss'],
})
export class CambiarpassPage implements OnInit {

  urlapi = "http://192.168.1.74:8080/Wod/"

  cp = {
    "idUsuario": "",
    "contraseniaAnterior": "",
    "contraseniaNueva": "",
    "confirmarpass": ""
  }

  mensaje: string;
  mensajerr: string;
  submitted = false;
  numeroUsuario: string;
  usuario: any;
  idUsuario: string;
  idRol

  constructor
    (
      private servicio: LoginService,
      private storage: Storage,
      private navParams: NavParams,
      public toastController: ToastController,
      public alertController: AlertController,
      private navCtrl: NavController,
      private loadingController: LoadingController
    ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("El usuario en ASISTENCIA ALUMNO es :", this.usuario.respuesta.nombre);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      this.idRol = this.usuario.respuesta.idRol;
    });
  }

  ngOnInit() {
    this.cambioloading();
  }

  atras() {
      this.navCtrl.navigateRoot('/user');
  }

  passNuevo(form: NgForm) {
    let obj = {
      "idUsuario": this.numeroUsuario,
      "contraseniaAnterior": this.cp.contraseniaAnterior,
      "contraseniaNueva": this.cp.contraseniaNueva
    }
    this.submitted = true;

    if (this.cp.contraseniaNueva === this.cp.confirmarpass) {
      this.servicio.cambiarPass(obj).subscribe((response: any) => {
        console.log(response, "Password cambiado");

        this.mensaje = response.respuesta;

        this.mensajerr = response.descripcion;

        if (response.codigo == 200) {

          this.cambiopassLoading();
          this.storage.clear();
          this.navCtrl.navigateRoot('/login');

        } else {
          this.erroPass();
          this.clearForm();
        }
      });

    } else {
      this.passIncorrecto();
      this.clearForm();
    }
  }

  async passIncorrecto() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no coinciden.',
      duration: 1000
    });
    toast.present();
  }

  async erroPass() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajerr,
      buttons: ['OK']
    });

    await alert.present();
  }

  async cambiopassLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: this.mensaje,
      duration: 800
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  clearForm() {
    this.cp.contraseniaAnterior = '';
    this.cp.contraseniaNueva = '';
    this.cp.confirmarpass = '';
  }

  async cambioloading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: "Cargando",
      duration: 800
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
