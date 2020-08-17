import { Component, OnInit } from "@angular/core";
import { LoadingController, ActionSheetController, AlertController } from "@ionic/angular";
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
  urlapi = "http://192.168.1.74:8080/Wod/";

  constructor(
    private router: Router,
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
        this.router.navigate(["/admin"]);
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
    this.router.navigate(["/admin"]);
  }

  registro(){
    this.router.navigate(["/registro"]);

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
