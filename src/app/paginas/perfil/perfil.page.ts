import { Component, OnInit } from "@angular/core";
import { LoadingController, ActionSheetController } from "@ionic/angular";
import { LoginService } from "src/app/servicios/login.service";
import { Router } from "@angular/router";
import { IfStmt } from '@angular/compiler';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"],
})
export class PerfilPage implements OnInit {

  perfiles: any[] = [];

  textoBuscar = '';

  listado: any;
  urlapi = "http://3.133.28.198:8080/Wod/";

  constructor(
    private router: Router,
    private servicio: LoginService,
    public actionSheetController: ActionSheetController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.servicio.getData(this.urlapi + "Usuarios/").subscribe((data) => {
      this.quitLoading();
      console.log(data);
      this.listado = data;
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      spinner: "crescent",
      message: "Por favor espere..."
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
}
