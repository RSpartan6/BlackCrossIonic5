import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nu = {
    "idRol": 2,
    "usuario": "",
    "contrasenia": "",
    "nombre": "",
    "sexo": "",
    "correo_electronico": "",
    "peso": "",
    "altura": "--",
    "imc": "--",
    "telefono": "",
    "nivel": "",
    "estatus": "",
    "intentos": "",
  }

  submitted = false;

  constructor
    (
      private router: Router,
      public toastController: ToastController,
      private servicio: LoginService,
      public loadingController: LoadingController,
      public http: HttpClient,
      public alertController: AlertController
    ) { }

  // Agregar nuevo usuario
  nuevoUsuario(form: NgForm) {
    let obj = {
      // "idUsuario":null,
      "idRol": 2,
      "usuario": this.nu.usuario,
      "contrasenia": this.nu.contrasenia,
      "nombre": this.nu.nombre,
      "sexo": this.nu.sexo,
      "correoElectronico": this.nu.correo_electronico,
      "peso": 0,
      "altura": 0,
      "imc": "--",
      "telefono": this.nu.telefono,
      "nivel": "10",
      "estatus": 1,
      "intentos": 0,
    }

    this.submitted = true;

    if (form.valid) {

      this.servicio.setCrear(obj).subscribe((response: any) => {
        console.log(response, "SetCrear Method");

        if (response.codigo == 500) {

          this.usuarioExistente()
        } else {
          this.presentLoading();
        }
      });
      console.log(this.nu);
      // this.navCtrl.push(ClasesPage)

    } else {
      this.todoslosCampos()
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Agregando usuario',
      duration: 1200,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.router.navigate(['/perfil']);
  }

  async usuarioExistente() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Usuario ya registrado',
      duration: 500,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    this.router.navigate(['/registro']);
  }

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

 
    segmentChanged(ev: any) {
      console.log('Segment changed', ev);
    }

  ngOnInit() {
  }

}
