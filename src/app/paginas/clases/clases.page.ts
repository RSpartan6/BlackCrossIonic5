import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  listado:any;
  idClase: string;
  usuario:any;

  urlapi="http://3.133.28.198:8080/Wod/";
  
  constructor(
    private servicio : LoginService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private storage: Storage, 
    private navParams: NavParams
  ) 
  {
    this.usuario = this.navParams.get(this.usuario);
      this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("El usuario en HORARIO es :",this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
    });
   }

  ngOnInit() {

    this.servicio.getData(this.urlapi + 'Clases').subscribe(data =>{
      console.log(data, "listado de clases");
      this.presentLoading();
      this.listado=data;
    });
  }
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Por favor espere...',
      duration: 800
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'La clase esta llena',
      buttons: ['OK']
    });

    await alert.present();
  }


}
