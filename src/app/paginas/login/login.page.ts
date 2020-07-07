import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/interfaces/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  mensaje:string;

  submitted = false;

  constructor(
    private loginService: LoginService,
    private loadingController: LoadingController,
    private storage: Storage,
    private navCtrl: NavController,
    public alertController: AlertController,
    // private http: HttpClient,
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

          this.mensaje = json.descripcion;

          console.log("Rol Usuario", json.respuesta.idRol);

          // if (this.login.usuario == 'LUISC') {

          if(json.codigo == 200){

            if (json.respuesta.idRol == 1) {
              console.log(this.login.usuario);
              console.log("Usuario Entrenador", json.respuesta.nombre);
              this.navCtrl.navigateRoot('/menu');
  
            } else 
            
            if (json.respuesta.idRol == 2) {
              console.log(this.login.usuario);
              console.log("Usuario Cliente", json.respuesta.nombre)
              this.navCtrl.navigateRoot('/clasesalumnos');
              this.clearForm();
            } else 
            
            if (json.respuesta.usuario === null)
            {
              console.log("Usuario no registrado");
              this.clearForm();
            }

          }else {
            this.clearForm();
            console.log("Usuario no valido");
            this.Loadingdatosinc(this.mensaje);

          }
        }
      );
    } else {
      this.Loadingdatosinc("Verifica que el usuario y contraseña esten ingresados")
      this.clearForm();
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Iniciando Sesion',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  // async errordeSesion() {
  //   const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     spinner: "crescent",
  //     message: this.mensaje,
  //     duration: 1500
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  // }


  // async Loadingdatosinc() {
  //   const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     spinner: "crescent",
  //     message: 'Favor de llenar todos los campos',
  //     duration: 1500
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  // }

  async Loadingdatosinc(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: msj,
      buttons: ['OK']
    });
    await alert.present();
  }

  clearForm() {
    this.login.contrasenia = '';
    this.login.usuario = '';
  }

  async showAlert(msj) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: msj,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  ngOnInit() {
  }

}
