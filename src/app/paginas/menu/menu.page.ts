import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { NavParams } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  usuario;

  constructor(private storage: Storage, private navParams: NavParams) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      if (this.usuario) {
        this.verUsuario();
      }
      console.log("Rol de Usuario BlackCross= ", user.respuesta.idRol);
    });
  }

  verUsuario() {
    console.log("MENU APP BLACKCROSS");
    console.log("El usuario es:", this.usuario);
  }
  ngOnInit() {}
}
