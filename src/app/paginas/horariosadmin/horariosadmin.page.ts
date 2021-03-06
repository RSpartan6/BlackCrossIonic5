import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams, LoadingController, NavController, AlertController } from '@ionic/angular';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-horariosadmin',
  templateUrl: './horariosadmin.page.html',
  styleUrls: ['./horariosadmin.page.scss'],
})
export class HorariosadminPage implements OnInit {

  listado: any;
  usuario: any;
  idClase: string;
  fechaf: string;
  codigo
  idrol

  urlapi = "http://3.133.28.198:8080/Wod/";

  fechacal = this.fechaf;

  constructor
    (
      private servicio: LoginService,
      private activatedRoute: ActivatedRoute,
      private storage: Storage,
      private navParams: NavParams,
      private loadingController: LoadingController,
      private navCtrl: NavController,
      private alertCtrl: AlertController
    ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      this.idrol = this.usuario.respuesta.idRol;

      console.log(this.idrol, "Rolde usuario en Horarios");
    });
  }

  // ionViewWillEnter() {
  //   this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
  //   console.log(this.fechaf, "fecha del calendario");
  // }

  ngOnInit() {
    this.horariosLoading();
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    this.servicio.getData(this.urlapi + 'Clases' + "/por-fecha/" + this.fechaf).subscribe(data => {

      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.codigo = json.codigo;
      console.log("Codigo del get", this.codigo);

      if (this.codigo === 200) {
        console.log(data, "listado de clases");
        this.quitLoading();
        this.listado = data;
        console.log(this.fechaf, "fecha del ngoninit");
      } else {
        this.errorClases();
        this.navCtrl.navigateRoot('/caladmin')
      }
    });
  }

  atras() {
    this.navCtrl.navigateBack('/caladmin');
  }

  async horariosLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: "Cargando clases",
      duration: 3000

    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async errorClases() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: "Error al mostrar las clases",
      buttons: ['OK']
    });

    await alert.present();
  }

  quitLoading() {
    this.loadingController.dismiss();
  }

}
