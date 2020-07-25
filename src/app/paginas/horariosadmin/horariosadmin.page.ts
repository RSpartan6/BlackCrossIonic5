import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute } from '@angular/router';
import { NavParams, LoadingController, NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-horariosadmin',
  templateUrl: './horariosadmin.page.html',
  styleUrls: ['./horariosadmin.page.scss'],
})
export class HorariosadminPage implements OnInit {

  listado:any;
  usuario:any;
  idClase: string;
  fechaf :string;

  urlapi="http://3.133.28.198:8080/Wod/";

  fechacal = this.fechaf;

  constructor
  (
    private servicio : LoginService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage, 
    private navParams: NavParams,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) 
    {
      this.usuario = this.navParams.get(this.usuario);
      this.storage.get("userData").then((user) => {
      this.usuario = user;      
      // console.log("El usuario en HORARIO es :",this.usuario.respuesta.nombre);
      // console.log("Y su Rol es :", this.usuario.respuesta.idRol);
    });
     }

     ionViewWillEnter(){
      this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf'); 
      console.log(this.fechaf, "fecha del calendario");    
    }
  
    ngOnInit() {

      this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf'); 

      this.servicio.getData(this.urlapi + 'Clases').subscribe(data =>{
        console.log(data, "listado de clases");        
        this.listado=data;
        console.log(this.fechaf, "fecha del ngoninit");      
      });

      this.horariosLoading();
    }

    atras(){
      this.navCtrl.navigateBack('/caladmin');
    }

    async horariosLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        spinner: "crescent",
        message: "Cargando clases",
        duration: 800
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
    }

}
