import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-asistentes",
  templateUrl: "./asistentes.page.html",
  styleUrls: ["./asistentes.page.scss"],
})
export class AsistentesPage implements OnInit {

  idClase: string;
  listado: any;

  nombre: string;
  profesor: string;


  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {

    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.profesor = this.activatedRoute.snapshot.paramMap.get('profesor');

    console.log("El ID de la clase es :",this.idClase);

    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '/').subscribe(data =>{
      console.log(data , "ngOnInit");
      this.listado=data;
    });
  }

}
