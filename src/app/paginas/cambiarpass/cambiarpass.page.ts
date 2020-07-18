import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController, AlertController, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-cambiarpass',
  templateUrl: './cambiarpass.page.html',
  styleUrls: ['./cambiarpass.page.scss'],
})
export class CambiarpassPage implements OnInit {

  urlapi = "http://3.133.28.198:8080/Wod/"

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
      private navCtrl: NavController
    ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("El usuario en ASISTENCIA ALUMNO es :", this.usuario.respuesta.nombre);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      console.log("El Rol del usuario es : ", this.usuario.respuesta.idRol);

      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      this.idRol = this.usuario.respuesta.idRol;
    });
  }

  ngOnInit() {

  }

  atras() {
    if (this.usuario.respuesta.idRol === 1) {

      this.navCtrl.navigateRoot('/menu');

    } else {
      this.navCtrl.navigateRoot('/calalumno');

    }
  }

  passNuevo(form: NgForm) {

    console.log("ID del usuario:", this.numeroUsuario);

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

          this.cambioPass();
          this.navCtrl.navigateRoot('/calalumno');


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


  async cambioPass() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  clearForm() {
    this.cp.contraseniaAnterior = '';
    this.cp.contraseniaNueva = '';
    this.cp.confirmarpass = '';
  }

}
