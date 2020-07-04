import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute } from "@angular/router";
import { LoadingController, NavParams } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-asisalumno',
  templateUrl: './asisalumno.page.html',
  styleUrls: ['./asisalumno.page.scss'],
})
export class AsisalumnoPage implements OnInit {

  fechaClase: Date = new Date();

  fa = {
    "fecha": ""
  }

  idClase: string;
  listado: any;
  idUsuario: string;
  nombre: string;
  profesor: string;
  usuario: any;
  idUser: string;
  fechaDeClase: string;
  fecha: string;

  urlapi = "http://3.133.28.198:8080/Wod/"

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    private storage: Storage,
    private navParams: NavParams
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;

      console.log("El usuario en MENU es :", this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
      console.log("El ID es :", this.usuario.respuesta.idUsuario);

      this.idUser = this.usuario.respuesta.idUsuario;

      console.log(this.idUser);

    });
  }

  ionViewWillEnter() {

    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('idusuario');
    this.usuario = this.activatedRoute.snapshot.paramMap.get('usuario');

    this.servicio.getData(this.urlapi + 'Usuarios/usuario/' + this.usuario + '/').subscribe(data => {

      console.log(data);

      this.listado = data;

    });
  }



  asistir(idUser, idClase) {

    this.servicio.asistenciaAlumno(this.idUser, this.idClase,this.fecha).subscribe((response: any) => {
      console.log(response, "Asistencia apartada");

    });
    this.activandoLoading();
    console.log("Fecha seleccionada",this.fecha);
  }

  quitarAsistencia(idUser, idClase, fecha) {

    this.servicio.eliminarAlumno(this.idUser, this.idClase,this.fecha).subscribe((response: any) => {
      console.log(response, "Asistencia eliminada");
    });
    
    this.asistenciaEliminada();
    console.log("Fecha seleccionada",this.fecha);
  }

  async activandoLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Lugar apartado',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async asistenciaEliminada() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Asistencia eliminada',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ngOnInit() {

    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.profesor = this.activatedRoute.snapshot.paramMap.get('profesor');

    console.log("El ID de la clase es :", this.idClase);

    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '/').subscribe(data => {
      console.log(data, "ngOnInit");
      this.listado = data;

      // Convertir data en JSON
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.fechaDeClase = json.respuesta.fecha;
      console.log("Fecha de la clase", this.fechaDeClase);
    });
  }

  cambiofecha(filtro) {

    this.fecha = this.fa.fecha.substring(0, 10);

    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '?fecha=' + this.fecha).subscribe(data => {
      console.log(data, "cambioFecha");
      this.listado = data;
    });

    console.log(event, "evento");

    console.log(this.fecha, "fecha seleccionada");

    console.log("La fecha seleccionada por el alumno es:", this.fechaDeClase);

  }

}
