import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {

  mensajerror
  mensaje
  fechaf

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
      private navCtrl: NavController,
      private activatedRoute: ActivatedRoute,

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
        this.mensajerror = response.mensaje;
        this.mensaje = response.respuesta;
        if (response.codigo === 200) {
          this.presentLoading();

        } else {
          this.errorCrear();
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
      header: this.mensajerror,
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

    this.navCtrl.navigateRoot('/horariosadmin/' + this.fechaf)
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {
    this.fechaf = this.activatedRoute.snapshot.paramMap.get('fechaf');
    console.log("Fecha seleccionada al crear clase: " + this.fechaf);
  }

}
