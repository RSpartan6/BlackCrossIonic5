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
  fechaDeClase:string;


  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
  ) 
  {

  }

  ngOnInit() {

    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.profesor = this.activatedRoute.snapshot.paramMap.get('profesor');

    console.log("El ID de la clase es :", this.idClase);

    console.log('fecha in:' + this.fecha);
    if (this.fecha === undefined) {
      console.log('entro');
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      this.fecha = yyyy + "-" + mm + "-" + dd;
    }
    console.log('fecha f:' + this.fecha);

    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '?fecha=' + this.fecha).subscribe(data => {

      console.log(data, "ngOnInit");
      this.listado = data;

      // Convertir data en JSON
      let objUsuario = JSON.stringify(data);
      let json = JSON.parse(objUsuario);
      this.fechaDeClase = json.respuesta.fecha;
      console.log("Fecha de la clase", json.respuesta.fecha);

    });
  }

  cambiofecha(filtro) {    

    this.fecha = this.f.fecha.substring(0,10);
    
    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '?fecha=' + this.fecha).subscribe(data => {
      console.log(data, "cambioFecha");
      this.listado = data;
    });

    console.log(event, "evento");

    console.log(this.fecha);

    console.log("La fecha seleccionada es:" , this.fechaDeClase);
    
  }


}
