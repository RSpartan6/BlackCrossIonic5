import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  rp = {
    "email": ""
  }

  mensaje  
  codigo
  listado: any;
  submitted = false;

  urlapi = "http://192.168.1.74:8080/Wod/"


  constructor
    (
      private navCtrl: NavController,
      private servicio: LoginService,
      private loaginCtrl: LoadingController,
      private alertCtrl: AlertController
    ) { }

  recuperarPass(form: NgForm) {
    let obj = {
      "email": this.rp.email
    }
    this.submitted = true;

    this.servicio.getData(this.urlapi + 'Usuarios/' + this.rp.email ).subscribe(data => {

      console.log(data);
      this.listado = data;
      this.codigo = this.listado.codigo;
      this.mensaje = this.listado.descripcion;

       if (this.codigo === 200) {
         
        this.cambiopassLoading();
        this.navCtrl.navigateRoot('/login');
       } else {
            this.erroPass();
            this.clearForm();
          }
      
    });

    // this.servicio.recuperarPass(obj).subscribe((response: any) => {
    //   console.log(response, "Password recuperado");

    //   this.mensaje = response.respuesta;
    //   this.mensajerr = response.descripcion;

    //   if (response.codigo == 200) {

    //     this.cambiopassLoading();
    //     this.navCtrl.navigateRoot('/login');

    //   } else {
    //     this.erroPass();
    //     this.clearForm();
    //   }
    // });
  }
  async cambiopassLoading() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async erroPass() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  clearForm() {
    this.rp.email = '';
  }


  ngOnInit() {
  }

  atras() {
    this.navCtrl.navigateRoot('/login');

  }

}
