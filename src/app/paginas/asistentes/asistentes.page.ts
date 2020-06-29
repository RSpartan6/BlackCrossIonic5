import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-asistentes",
  templateUrl: "./asistentes.page.html",
  styleUrls: ["./asistentes.page.scss"],
})
export class AsistentesPage implements OnInit {
  urlapi = "http://3.133.28.198:8080/Wod/";

  idClase: string;
  // nombreClase: string;
  listado: any;
  // listado2:any;

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idClase = this.activatedRoute.snapshot.paramMap.get("idClase");

    this.servicio
      .getData(this.urlapi + "AsistenciaClases/" + this.idClase + "/")
      .subscribe((data) => {
        console.log(data);
        this.listado = data;
      });
  }
}
