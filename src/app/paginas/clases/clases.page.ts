import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {


  listado:any;
  listado2:any;
  // idClase: string;
  urlapi="http://3.133.28.198:8080/Wod/";
  constructor(
    private servicio : LoginService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.servicio.getData(this.urlapi + 'Clases'+ '/').subscribe(data =>{
      console.log(data);
      this.presentLoading();
      this.listado=data;
    });

    // this.servicio.getData(this.urlapi + 'Usuarios/').subscribe(data =>{
    //   console.log(data);
    //   this.listado2=data;
    // });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
