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

  urlapi = "http://192.168.1.74:8080/Wod/";

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
  msjError

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

    console.log(obj, "editar perfil");
  }

  activarUser(idUsuario) {

    this.servicio.activarUser(idUsuario).subscribe((response: any) => {

      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, "Usuario Activado");
        this.userActivado();
      } else {
        this.msjError();
      }
    });
    // this.navCtrl.navigateRoot('/perfil');
  }

  desactivarUser(idUsuario) {

    this.servicio.desactivarUser(idUsuario).subscribe((response: any) => {
      this.mensaje = response.respuesta;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, "Usuario Desactivado");
        this.userDesactivado();
      } else {
        this.msjError();
      }
    });
    // this.navCtrl.navigateRoot('/perfil');    
  }

  bPago(idUsuario){

    this.servicio.bloquePorPago(idUsuario).subscribe((response: any) => {
      this.mensaje = response.descripcion;
      this.msjError = response.descripcion;
      if (response.codigo === 200) {
        console.log(response, "Usuario desactivado por pago");
        this.userDesactivado();
      } else {
        this.msjError();
      }
    });
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

  async errActiDesac() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.msjError,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Alertas de activo e inactivo

  async userActivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async userDesactivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.mensaje,
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
