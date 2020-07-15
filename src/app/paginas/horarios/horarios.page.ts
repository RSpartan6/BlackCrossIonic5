import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  
  listado:any;
  // usuario:any;
  idClase: string;
  fechaf :string;

  urlapi="http://3.133.28.198:8080/Wod/";

  constructor
  (
    private servicio : LoginService,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ionViewWillEnter(){

    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf'); 

    console.log(this.fechaf, "fecha del calendario");
    
  }


  ngOnInit() {

    this.servicio.getData(this.urlapi + 'Clases' + "/por-fecha/" + this.fechaf).subscribe(data =>{
      console.log(data, "listado de clases");
      this.listado=data;
      console.log(this.fechaf, "fecha del ngoninit");      
    });
  }

}
