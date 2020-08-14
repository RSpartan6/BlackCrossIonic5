import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  listado: any;
  usuario: any;
  idClase: string;
  idUsuario: string;
  fechaf: string;
  numeroUsuario: string;
  mensaje: string;
  estatus: string;
  nombre
  mensajeerror: string;
  codigo

  urlapi = "http://3.133.28.198:8080/Wod/";

  constructor
    (
      private servicio: LoginService,
      private activatedRoute: ActivatedRoute,
      private storage: Storage,
      private navParams: NavParams,
      public alertController: AlertController,
      private loadingController: LoadingController,
      private navCtrl: NavController
    ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;

      console.log("El usuario en HORARIO es :", this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      this.numeroUsuario = this.usuario.respuesta.idUsuario;

      console.log("sdsdfsdf", this.numeroUsuario);

      this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
      this.idUsuario

      this.horariosLoading();

      this.servicio.getData(this.urlapi + 'Clases' + "/por-fecha/" + this.fechaf + "/" + this.numeroUsuario).subscribe(data => {
        console.log(data, "listado de clases");


        let objUsuario = JSON.stringify(data);
        let json = JSON.parse(objUsuario);
        this.codigo = json.codigo;
        console.log("Codigo del get", this.codigo);

        if (this.codigo === 200) {
          this.quitLoading();
        } else {
          this.errorQuitar();
          this.navCtrl.navigateRoot('/calalumno');
        }
        
        this.listado = data;
        console.log(this.fechaf, "fecha del constrauctor");
      });
      // this.horariosLoading();
    });
  }

  ionViewWillEnter() {
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    console.log(this.fechaf, "fecha del calendario");
  }

  ngOnInit() {
  }

  obtenerDatos() {
    this.servicio.getData(this.urlapi + 'Clases' + "/por-fecha/" + this.fechaf + "/" + this.numeroUsuario).subscribe(data => {
      console.log(data, "listado de clases");
      this.listado = data;
    });
  }

  marcarAsistencia(idClase) {

    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    this.servicio.getData(this.urlapi + 'Clases' + "/esta-en-clase/" + idClase + "/" + this.numeroUsuario + "/" + this.fechaf).subscribe(data => {

      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.mensaje = json.respuesta.mensaje;
      this.mensajeerror = json.respuesta.descripcion;
      console.log("Mensaje : ", this.mensaje);
      this.estatus = json.respuesta.estatus;
      console.log("Estatus del asistente", this.estatus);
      this.presentAlertConfirm(idClase);
    });
  }

  async presentAlertConfirm(idClase) {

    if (this.estatus == "0") {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: this.mensaje,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Boton de cancelar');
            }
          }, {
            text: 'Aceptar',
            handler: () => {
              this.asistir(idClase);
              console.log(idClase, this.mensaje);
            }
          }
        ]
      });
      await alert.present();
    } else if (this.estatus == "1") {
      console.log("usuario ya dado de alta");
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: this.mensaje,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Boton de cancelar');
            }
          }, {
            text: 'Aceptar',
            handler: () => {
              this.quitarAsistencia(idClase);
              console.log(idClase, this.mensaje);

            }
          }
        ]
      });
      await alert.present();
    }
  }

  asistir(idClase) {

    console.log('fecha asistir:' + this.fechaf);
    this.servicio.asistenciaAlumno(idClase, this.numeroUsuario, this.fechaf).subscribe((response: any) => {
      console.log(response, "Asistencia apartada");
      this.mensaje = response.respuesta;
      this.mensajeerror = response.descripcion;
      console.log(this.fechaf, "Fecha clase");
      console.log("Id de clase", idClase);
      if (response.codigo === 200) {
        this.agregadoAlert();
        console.log("Fecha seleccionada", this.fechaf);
        this.obtenerDatos();

      } else {
        this.usuarioEnclase();
      }
    });
  }

  quitarAsistencia(idClase) {

    console.log('fecha f:' + this.fechaf);
    this.servicio.eliminarAlumno(this.numeroUsuario, idClase, this.fechaf).subscribe((response: any) => {
      console.log(response, "Asistencia eliminada"); this.mensaje = response.respuesta;
      this.mensajeerror = response.descripcion;
      if (response.codigo === 200) {
        this.eliminarAsistencia();
        console.log("Fecha seleccionada", this.fechaf);
        this.obtenerDatos();

      } else if (response.codigo === 500) {
        console.log("Erro 500");
        this.errorQuitar();
      }
    });
  }

  async agregadoAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async errorQuitar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajeerror,
      buttons: ['OK']
    });

    await alert.present();
  }

  async usuarioEnclase() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajeerror,
      buttons: ['OK']
    });

    await alert.present();
  }

  async eliminarAsistencia() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async horariosLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: "Cargando clases",
      duration: 10000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  atras() {
    this.navCtrl.navigateRoot('/calalumno');
  }

  quitLoading() {
    this.loadingController.dismiss();
  }

}
