import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {

  mensaje
  
  nc = {
    "nombre": "",
    "horaInicio": "",
    "horaFin": "",
    "horario": "",
    "personas": "",
    "profesor": "",
  }

  submitted = false;

  constructor
    (
      private servicio: LoginService,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private router: Router

    ) { }

  nuevaClase(form: NgForm) {
    let obj = {
      "nombre": this.nc.nombre,
      "horaInicio": this.nc.horaInicio,
      "horaFin": this.nc.horaFin,
      "horario": this.nc.horario,
      "personas": this.nc.personas,
      "profesor": this.nc.profesor,
    }
    this.submitted = true;

    if (form.valid) {

      this.servicio.setNuevaclase(obj).subscribe((response: any) => {
        this.mensaje = response.mensaje;
        console.log(response, "Crear Nueva clase Method ");
        if (response.codigo == 500) {
          this.errorCrear()
        } if (response.codigo == 400) {
          this.errorCrear()
        } else {
          this.presentLoading();
        }
      });
      console.log(this.nc);
      // this.navCtrl.push(ClasesPage)

    } else {
      this.todoslosCampos()
    }
  }

  // Alerta de error (500)

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

  //Alert error al crear la clase

  async errorCrear() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Loading clase creada

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: this.mensaje,
      duration: 800,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.router.navigate(['/clases']);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {
  }

}
