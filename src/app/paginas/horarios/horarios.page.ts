import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams, AlertController } from '@ionic/angular';
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
  fechaf: string;
  numeroUsuario: string;
  mensaje: string;
  nombre
  mensajeerror: string;

  urlapi = "http://3.133.28.198:8080/Wod/";

  constructor
    (
      private servicio: LoginService,
      private activatedRoute: ActivatedRoute,
      private storage: Storage,
      private navParams: NavParams,
      public alertController: AlertController
    ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("El usuario en HORARIO es :", this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      this.numeroUsuario = this.usuario.respuesta.idUsuario;
    });
  }

  ionViewWillEnter() {
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    console.log(this.fechaf, "fecha del calendario");
  }

  ngOnInit() {

    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    this.servicio.getData(this.urlapi + 'Clases' + "/por-fecha/" + this.fechaf).subscribe(data => {
      console.log(data, "listado de clases");
      this.listado = data;
      console.log(this.fechaf, "fecha del ngoninit");

    });
  }

  marcarAsistencia(idClase) {

    this.presentAlertConfirm(idClase);
  }

  async presentAlertConfirm(idClase) {

    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    this.servicio.getData(this.urlapi + 'Clases' + "/esta-en-clase/" + idClase + "/" + this.numeroUsuario + "/" + this.fechaf).subscribe(data => {
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.storage.set('userData', data);
      this.mensaje = json.respuesta.mensaje;
      console.log("Mensaje : ", this.mensaje);

    });

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      subHeader: this.mensaje,
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
            console.log(this.idClase, this.mensaje);

          }
        }
      ]
    });
    await alert.present();
  }


  asistir() {

    console.log('fecha asistir:' + this.fechaf);
    this.servicio.asistenciaAlumno(this.idClase, this.numeroUsuario, this.fechaf).subscribe((response: any) => {
      console.log(response, "Asistencia apartada");
      this.mensaje = response.respuesta;
      this.mensajeerror = response.descripcion;
      console.log(this.fechaf, "Fecha clase");
      if (response.codigo == 200) {
        this.agregadoAlert();
        console.log("Fecha seleccionada", this.fechaf);
      } else {
        this.usuarioEnclase();
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

  async usuarioEnclase() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.mensajeerror,
      buttons: ['OK']
    });

    await alert.present();
  }


}
