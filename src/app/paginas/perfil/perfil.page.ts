import { Component, OnInit } from "@angular/core";
import { LoadingController, ActionSheetController, AlertController, NavController } from "@ionic/angular";
import { LoginService } from "src/app/servicios/login.service";
import { Router } from "@angular/router";
import { IfStmt } from '@angular/compiler';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {

  mensaje: string;

  perfiles: any[] = [];

  textoBuscar = '';

  listado: any;
  urlapi = "http://3.133.28.198:8080/Wod/";

  constructor(
    private navCtrl: NavController,
    private servicio: LoginService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    
    this.presentLoading();

    this.servicio.getData(this.urlapi + "Usuarios/").subscribe((data) => {
      console.log(data);
      this.listado = data;

      // this.quitLoading();

      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);

      this.mensaje = json.descripcion;

      if (json.codigo === 200) {
        this.quitLoading();
        console.log("Entro bien");
      }else{
        this.errorCargar();
        this.navCtrl.navigateRoot('/admin');
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      spinner: "crescent",
      message: "Por favor espere...",
      duration: 10000
    });
    await loading.present();
  }

  quitLoading(){
    this.loadingController.dismiss();
  }

  menuPerfil() {
    this.navCtrl.navigateRoot('/admin');
  }

  registro(){
    this.navCtrl.navigateRoot('/registro');
  }

  buscar(event) {
    console.log(event);
    this.textoBuscar = event.detail.value;
  }

  async errorCargar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
