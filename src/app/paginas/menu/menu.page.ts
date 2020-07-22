import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  usuario: any;
  respuesta

  constructor
    (
      private navCtrl: NavController
    ) { }

  caladmin() {
    this.navCtrl.navigateRoot('/caladmin');
  }

  perfil() {
    this.navCtrl.navigateRoot('/perfil');
  }
  ngOnInit() { }
}
