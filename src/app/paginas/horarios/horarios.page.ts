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
  
  listado:any;
  usuario:any;
  idClase: string;
  fechaf :string;  

  urlapi="http://3.133.28.198:8080/Wod/";

  constructor
  (
    private servicio : LoginService,
    private activatedRoute: ActivatedRoute,
    private storage: Storage, 
    private navParams: NavParams,
    public alertController: AlertController
  ) 
    {
      this.usuario = this.navParams.get(this.usuario);
      this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("El usuario en HORARIO es :",this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
    });
     }

  ionViewWillEnter(){
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf'); 
    console.log(this.fechaf, "fecha del calendario");    
  }

  ngOnInit() {

    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf'); 

    this.servicio.getData(this.urlapi + 'Clases' + "/por-fecha/" + this.fechaf).subscribe(data =>{
      console.log(data, "listado de clases");
      this.listado=data;
      console.log(this.fechaf, "fecha del ngoninit");      
    });
  }


  marcarAsistencia(){

    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf'); 

    console.log("Fecha de la alerta",this.fechaf);
    

    this.presentAlertConfirm();

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
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
            console.log('Boton de aceptar');
          }
        }
      ]
    });

    await alert.present();
  }


}
