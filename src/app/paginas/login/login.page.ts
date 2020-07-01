import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: User = {
    usuario: '',
    contrasenia: ''
  };

  submitted = false;

  constructor(
    private loginService: LoginService,
    private loadingController: LoadingController,
    private storage: Storage,
    private navCtrl: NavController,
    // private http: HttpClient,
    private alertCtrl: AlertController
  ) { }

  onLogin(form: NgForm) {

    this.storage.clear();


    this.submitted = true;
    if (form.valid) {
      this.presentLoading()

      this.loginService.login(this.login).subscribe(
        data => {
          // this.storage.set('token', data);
          // let userData = (data);
          let objUsuario = JSON.stringify(data);
          let json = JSON.parse(objUsuario);
          this.storage.set('userData', data);

          console.log("Rol Usuario", json.respuesta.idRol);

          // if (this.login.usuario == 'LUISC') {

          if (json.respuesta.idRol == 1) {
            console.log(this.login.usuario);
            console.log("Usuario Entrenador", json.respuesta.nombre);
            this.navCtrl.navigateRoot('/menu');


          } else 
          
          if (json.respuesta.idRol == 2) {
            console.log(this.login.usuario);
            console.log("Usuario Cliente", json.respuesta.nombre)
            this.navCtrl.navigateRoot('/clases');
            this.clearForm();
          } else 
          
          if (json.respuesta.usuario === null)
          {
            console.log("Usuario no registrado");
            this.clearForm();
          }

          // else if(objUsuario.idRol == 5 || objUsuario.idRol == 3){
          //   this.navCtrl.push(ViajesTerminadosPage);
          // }else{
          //   this.showAlert("Credenciales no validas para la aplicación")
          // }
        },
        error=> {
          this.presentLoading3();
          this.clearForm();
          // if(err.status==400){
          //    console.log("Los datos ingresados parecen ser incorrectos, intentelo nuevamente.");
          // }else if(err.status==202){
          //   console.log("El usuario está bloqueado, favor de comunicarse con el administrador.");

          // }
          // else{
          //   console.log("Ocurrió un error inesperado, verifique su conexión");
          // }
        }
      );
    } else {
      this.Loadingdatosinc()
      this.clearForm();
    }
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

  async presentLoading2() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere 2...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentLoading3() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Error al iniciar sesion',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async Loadingdatosinc() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Favor de llenar todos los campos',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  clearForm() {
    this.login.contrasenia = '';
    this.login.usuario = '';
  }

  async showAlert(msj) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ngOnInit() {
  }

}
