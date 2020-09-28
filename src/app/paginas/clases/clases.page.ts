import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  listado: any;
  usuario: any;
  idClase: string;
  fechaf: string;
  codigo
  idrol

  urlapi = "http://3.133.28.198:8080/Wod/";

  constructor(
    private servicio: LoginService,
    private navCtrl: NavController,
    // private storage: Storage,
    // private navParams: NavParams,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {
    // this.usuario = this.navParams.get(this.usuario);
    // this.storage.get("userData").then((user) => {
    //   this.usuario = user;
    // });
  }

  ngOnInit() {
    this.horariosLoading();
    this.servicio.getData(this.urlapi + 'Clases').subscribe(data => {

      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.codigo = json.codigo;
      console.log("Codigo del get", this.codigo);

      if (this.codigo === 200) {
        console.log(data, "listado de clases");
        this.quitLoading();
        this.listado = data;
      } else {
        this.errorClases();
        this.navCtrl.navigateRoot('/admin')
      }
    });
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

  quitLoading() {
    this.loadingController.dismiss();
  }

  async errorClases() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: "Error al mostrar las clases",
      buttons: ['OK']
    });

    await alert.present();
  }


  atras() {
    this.navCtrl.navigateBack('/admin');
  }

  crearclass(){
    this.navCtrl.navigateRoot('/crearclase');
  }

}
