import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario;

  constructor(
    private storage: Storage,
    private navParams: NavParams

  ) {

    this.usuario = this.navParams.get('usuario');
    this.storage.get('userData').then((user) => {
      this.usuario = user;
      if (this.usuario) {
        this.verUsuario();
      }
      console.log(this.usuario, "CONSTRUCTOR");

      console.log("ROL DE USUARIO EN PAGINA HOME = ", user.respuesta.idRol);

    })
  }

  // ionViewWillEnter(){

  //   console.log("Usuario Logueado");
  //     this.storage.get('userData').then((user) => {
  //       this.usuario = user;
  //       if (this.usuario) {
  //         this.verUsuario();
  //       }
  //       console.log(this.usuario, "ionViewWillEnter");

  //     })
  // }

  verUsuario() {

    console.log("PAGINA HOME");
    console.log("El usuario es:", this.usuario);

  }
}
