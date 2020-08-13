import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  usuario
  idUsuario
  idRol
  numeroUsuario
  nombre
  telefono
  email
  sexo
  user

  constructor
    (
      private storage: Storage,
      private navParams: NavParams,
      private navCtrl: NavController
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

  ngOnInit() {
  }

  atras() {
    if (this.usuario.respuesta.idRol === 1) {

      this.navCtrl.navigateRoot('/caladmin');

    } else {
      this.navCtrl.navigateRoot('/calalumno');
    }
  }

}
