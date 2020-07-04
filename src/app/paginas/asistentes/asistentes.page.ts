import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute, Router } from "@angular/router";

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


  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
  ) {

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
      console.log("Fecha de la clase", json.respuesta.fecha);

    });
  }

  cambiofecha(event) {

    this.fecha = this.f.fecha.substring(0,10);
    
    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '?fecha=' + this.fecha).subscribe(data => {
      console.log(data, "cambioFecha");
      this.listado = data;
    });

    console.log(event, "evento");

    console.log(this.fecha);
  }


}
