import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

  urlapi = "http://3.133.28.198:8080/Wod/";

  usuario: string;
  sexo: string;
  correoElectronico: string;
  nombre: string;
  telefono: string;
  contrasenia: string;
  estatus: string;
  listado: any;
  idUsuario: string;
  mensaje

  constructor
    (
      private activatedRoute: ActivatedRoute,
      private servicio: LoginService,
      public loadingController: LoadingController,
      private navCtrl: NavController,
      private alertController: AlertController
    ) { }

  ionViewWillEnter() {

    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('idUsuario');
    this.usuario = this.activatedRoute.snapshot.paramMap.get('usuario');
    this.sexo = this.activatedRoute.snapshot.paramMap.get('sexo');
    this.correoElectronico = this.activatedRoute.snapshot.paramMap.get('correoElectronico');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.telefono = this.activatedRoute.snapshot.paramMap.get('telefono');
    this.contrasenia = this.activatedRoute.snapshot.paramMap.get('contrasenia');
    this.estatus = this.activatedRoute.snapshot.paramMap.get('estatus');

    console.log(this.usuario, "Usuario");

    this.servicio.getData(this.urlapi + 'Usuarios/usuario/' + this.usuario + '/').subscribe(data => {
      console.log(data, "informacion del perfil seleccionado");
      this.listado = data;
    });
  }

  ep = {
    "idUsuario": this.idUsuario,
    "idRol": "",
    "usuario": "",
    "contrasenia": "",
    "nombre": "",
    "sexo": "",
    "correoElectronico": "",
    "peso": "",
    "altura": "--",
    "imc": "--",
    "telefono": "",
    "nivel": "",
    "estatus": "",
    "intentos": "",
  }

  submitted = false;

  // Metodos

  editarUsuario(form: NgForm) {

    let obj = {
      "idUsuario": this.idUsuario,
      "idRol": 2,
      "usuario": this.ep.usuario,
      "contrasenia": this.ep.contrasenia,
      "nombre": this.ep.nombre,
      "sexo": this.ep.sexo,
      "correoElectronico": this.ep.correoElectronico,
      "peso": 0,
      "altura": 0,
      "imc": "--",
      "telefono": this.ep.telefono,
      "nivel": "10",
      "estatus": this.ep.estatus,
      "intentos": 0,
    }

    this.submitted = true;

    if (form.valid) {

      this.servicio.editarUsuario(obj).subscribe((response: any) => {

        this.mensaje = response.respuesta;

        if (response.codigo === 200) {
          this.actualizado();
          this.navCtrl.navigateRoot('/perfil');
        } else {
          this.actualizado();
        }
      });

    } else {
      this.todoslosCampos();
    }

    console.log(obj, "ediar perfil");
  }

  activarUser(idUsuario) {

    this.servicio.activarUser(idUsuario).subscribe((response: any) => {
      console.log(response, "Usuario Activado");
    });
    this.userActivado();

    // this.navCtrl.navigateRoot('/perfil');
  }

  desactivarUser(idUsuario) {

    this.servicio.desactivarUser(idUsuario).subscribe((response: any) => {
      console.log(response, "Usuario Desactivado");
    });
    this.userDesactivado();

    // this.navCtrl.navigateRoot('/perfil');

  }

  // Fin Metodos

  // Alerta actualizado
  async actualizado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Por favor espere...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  // Alertas de activo e inactivo


  async userActivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario activado',
      buttons: ['OK']
    });

    await alert.present();
  }

  async userDesactivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario desactivado',
      buttons: ['OK']
    });

    await alert.present();
  }



  // Fin alertas activo o inactivo

  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
}
