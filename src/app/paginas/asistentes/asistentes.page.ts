import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { NavParams } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-asistentes",
  templateUrl: "./asistentes.page.html",
  styleUrls: ["./asistentes.page.scss"],
})
export class AsistentesPage implements OnInit {

  idClase: string;
  // nombreClase: string;
  listado: any;
  // listado2:any;
  usuario:any;

  constructor(
    private servicio: LoginService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private storage: Storage, 
    private navParams: NavParams,
    private http: HttpClient
  ) {
    this.usuario = this.navParams.get(this.usuario);
    this.storage.get("userData").then((user) => {
      this.usuario = user;

      console.log("El usuario en ASISTENCIAS es :",this.usuario.respuesta.nombre);
      console.log("Su Rol es :", this.usuario.respuesta.idRol);
      console.log("Y su ID es:", this.usuario.respuesta.idUsuario);
      
      // if (this.usuario) {
      //   this.verUsuario();
      // }
      // console.log("Rol de Usuario BlackCross= ", user.respuesta.idRol);
    });
  }

  ngOnInit() {

    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');

    console.log("El ID de la clase es :",this.idClase);

    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/'+this.idClase).subscribe(data =>{
      console.log(data , "ngOnInit");
      this.listado=data;

      console.log(this.listado.respuesta.clase.profesor, "Profesor");
    });
  }

}
