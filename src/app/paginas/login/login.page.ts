import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = {
    "usuario": "",
    "contrasenia": ""
  };

  mensaje: string;
  Rol
  usuario
  codigo

  submitted = false;

  constructor(
    private servicio: LoginService,
    private loadingController: LoadingController,
    private storage: Storage,
    private navCtrl: NavController,
    public alertController: AlertController,

  ) { }

  onLogin(form: NgForm) {
    let obj = {
      "usuario": this.login.usuario,
      "contrasenia": this.login.contrasenia
    }
    this.submitted = true;

    if (form.valid) {

      console.log(this.storage);
      

      this.servicio.loginPost(obj).subscribe((response: any) => {

        let data = response;

        this.storage.set('userData', data);    
        
        console.log("json",data);        

        
        this.codigo = response.codigo;
        console.log(response, "Login nuevo method");

        if (response.codigo == 200) {

          this.mensaje = response.mensaje;
        this.Rol = response.respuesta.idRol;
        this.usuario = response.respuesta.usuario;

          this.presentLoading();

          if (this.Rol === 1) {
            console.log(this.login.usuario);
            console.log("Usuario Entrenador");
            this.navCtrl.navigateRoot('/admin');

          } else

            if (this.Rol === 2) {
              console.log(this.login.usuario);
              console.log("Usuario Cliente",)
              this.navCtrl.navigateRoot('/calalumno');
              this.clearForm();
            } else

              if (this.Rol === null) {
                console.log("Usuario no registrado");
                this.clearForm();
              }

        } else if (response.codigo === 500) {
          this.errorLogin(response.descripcion);
          console.log("Error 500");
          
        }
          
      });
      console.log(this.login);

    } else {
      this.todoslosCampos()
    }
  }

  // Alert error 500
  async errorLogin(msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: msj,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Alert todos los campos necesarios
  async todoslosCampos() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Todos los campos son necesarios',
      buttons: ['OK']
    });

    await alert.present();
  }

  // onLogin(form: NgForm) {
  //   // this.storage.clear();

  //   this.submitted = true;

  //   if (form.valid) {

  //     this.presentLoading()

  //     this.servicio.login(this.login).subscribe(
  //       data => {
  //         let objUsuario = JSON.stringify(data);
  //         let json = JSON.parse(objUsuario);
  //         this.storage.set('userData', data);
  //         console.log("Json", json);

  //         this.mensaje = json.descripcion;

  //         console.log("Rol Usuario", json.respuesta.idRol);

  //         if (json.codigo == 200) {

  //           if (json.respuesta.idRol === 1) {
  //             console.log(this.login.usuario);
  //             console.log("Usuario Entrenador", json.respuesta.nombre);
  //             this.navCtrl.navigateRoot('/admin');

  //           } else

  //             if (json.respuesta.idRol === 2) {
  //               console.log(this.login.usuario);
  //               console.log("Usuario Cliente", json.respuesta.nombre)
  //               this.navCtrl.navigateRoot('/calalumno');
  //               this.clearForm();
  //             } else

  //               if (json.respuesta.usuario === null) {
  //                 console.log("Usuario no registrado");
  //                 this.clearForm();
  //               }

  //         } else {
  //           this.clearForm();
  //           console.log("Usuario no valido");
  //           this.Loadingdatosinc(this.mensaje);
  //         }
  //       }
  //     );
  //   } else {
  //     this.Loadingdatosinc("Verifica que el usuario y contraseña esten ingresados")
  //     this.clearForm();
  //   }
  // }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      translucent: true,
      message: 'Bienvenido' + ' ' + this.usuario,
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

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

  async userDesactivado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atencion !',
      message: 'Usuario desactivado, contactate con el administrador.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    // this.storage.clear();
    // console.log("Storage Clear", this.storage);

  }

}
