import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
// import { Storage } from "@ionic/storage";
// import { NavParams } from "@ionic/angular";

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  listado:any;
  listado2:any;
  // usuario:any;
  idClase: string;

  urlapi="http://3.133.28.198:8080/Wod/";
  constructor(
    private servicio : LoginService,
    public loadingController: LoadingController,
    // private storage: Storage, 
    // private navParams: NavParams
  ) 
  { 
    // this.usuario = this.navParams.get(this.usuario);
    // this.storage.get("userData").then((user) => {
    //   this.usuario = user;

    //   console.log("El usuario en CLASES es :",this.usuario.respuesta.nombre);
    //   console.log("Su Rol es :", this.usuario.respuesta.idRol);
    //   console.log("Y su ID es:", this.usuario.respuesta.idUsuario);
    //   console.log("Su estatus es :", this.usuario.respuesta.estatus);

    // });
  }

  ngOnInit() {

    this.servicio.getData(this.urlapi + 'Clases').subscribe(data =>{
      console.log(data, "listado de clases");
      this.presentLoading();
      this.listado=data;
    });

    // this.servicio.getData(this.urlapi + 'Usuarios/').subscribe(data =>{
    //   console.log(data);
    //   this.listado2=data;
    // });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
