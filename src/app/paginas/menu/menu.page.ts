import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavParams } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  usuario:any;
  respuesta

  constructor
  (
    private storage: Storage, 
    private navParams: NavParams
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("El usuario en MENU es :",this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
    });
  }
  ngOnInit() {}
}
