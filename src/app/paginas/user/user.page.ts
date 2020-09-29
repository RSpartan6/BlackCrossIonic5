import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  usuario
  idRol
  numeroUsuario
  nombre
  telefono
  email
  sexo
  mensaje
  user

  constructor
    (
      private storage: Storage,
      private navParams: NavParams,
      private navCtrl: NavController,
      private servicio: LoginService,
      private alertController: AlertController,
      private loadingController: LoadingController
    ) {
    this.usuario = this.navParams.get(this.usuario);

    this.storage.get("userData").then((data) => {
      this.usuario = data;
      console.log("user :", data);

      console.log("El usuario en USER es :", this.usuario.respuesta.nombre);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      console.log("El Rol del usuario es : ", this.usuario.respuesta.idRol);
      console.log("El estatus del usuario es:", this.usuario.respuesta.estatus);

      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      this.idRol = this.usuario.respuesta.idRol;
      this.nombre = this.usuario.respuesta.nombre;
      this.telefono = this.usuario.respuesta.telefono;
      this.email = this.usuario.respuesta.correoElectronico;
      this.sexo = this.usuario.respuesta.sexo;
      this.user = this.usuario.respuesta.usuario;

    });
  }

  eu = {
    "idUsuario": "",
    "telefono": "",
    "correoElectronico": ""
  }

  editarUser() {
    let obj = {
      "idUsuario": this.numeroUsuario,
      "telefono": this.eu.telefono,
      "correoElectronico": this.eu.correoElectronico
    }

    this.servicio.editarUser(obj).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      if (response.codigo === 200) {
        this.actualizado();
        this.navCtrl.navigateRoot('/calalumno');
      } else {
        this.actualizado();
      }
    });
  }

  async actualizado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {

    this.userLoading();
  }

  atras() {
    if (this.usuario.respuesta.idRol === 1) {

      // this.navCtrl.navigateRoot('/caladmin');
      this.navCtrl.navigateRoot('/admin');

    } else {
      // this.navCtrl.navigateRoot('/calalumno');
      this.navCtrl.navigateRoot('/admin');
    }
  }

  cambiarpass(){
    this.navCtrl.navigateRoot('/cambiarpass')
  }

  async userLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: "Cargando",
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
