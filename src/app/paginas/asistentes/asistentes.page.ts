import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController, NavParams } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-asistentes",
  templateUrl: "./asistentes.page.html",
  styleUrls: ["./asistentes.page.scss"],
})
export class AsistentesPage implements OnInit {

  fechaClase: Date = new Date();

  f = {
    "fecha": ""
  }

  idClase: string;
  listado: any;
  fecha: string;
  nombre: string;
  profesor: string;
  fechaDeClase:string;
  fechaf:string;
  horaFin
  horaInicio
  horario
  nombreC:string
  usuario:any;


  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private storage: Storage, 
    private navParams: NavParams
  ) 
  {
    this.usuario = this.navParams.get(this.usuario);
      this.storage.get("userData").then((user) => {
      this.usuario = user;  
   });
  }

  ngOnInit() {

    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.profesor = this.activatedRoute.snapshot.paramMap.get('profesor');
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');    

    console.log("El ID de la clase es :", this.idClase);

    console.log('fecha ngOnInit:' + this.fechaf);
    // if (this.fecha === undefined) {
    //   console.log('entro');
    //   var today = new Date();
    //   var dd = String(today.getDate()).padStart(2, '0');
    //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //   var yyyy = today.getFullYear();
    //   this.fecha = yyyy + "-" + mm + "-" + dd;
    // }
    // console.log('fecha f:' + this.fecha);

    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '?fecha=' + this.fechaf).subscribe(data => {

      console.log(data, "ngOnInit");
      this.listado = data;

      // Convertir data en JSON
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.horaInicio = json.respuesta.clase.horaInicio;
      this.horaFin = json.respuesta.clase.horaFin;
      this.horario = json.respuesta.clase.horario;
      this.nombreC = json.respuesta.clase.nombre;

      console.log("Hora inicio", this.horaInicio);
      console.log("Hora fin", this.horaFin);     

    });
  }

  regresar(){
    this.navCtrl.navigateRoot('/horariosadmin/' + this.fechaf)
  }


}
