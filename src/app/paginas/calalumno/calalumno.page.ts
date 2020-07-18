import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-calalumno',
  templateUrl: './calalumno.page.html',
  styleUrls: ['./calalumno.page.scss'],
})
export class CalalumnoPage implements OnInit {

  fecha
  date: string;
  type: 'string';
  usuario: any;
  numeroUsuario: string;
  idUsuario: string;
  idRol


  constructor
    (
      public alertController: AlertController,
      public navCtrl: NavController,
      private storage: Storage,
      private navParams: NavParams
    ) { 
      this.usuario = this.navParams.get(this.usuario);
      this.storage.get("userData").then((user) => {
      this.usuario = user;
      console.log("El usuario en CALENDARIO es :", this.usuario.respuesta.nombre);
      console.log("El ID del usuario es  :", this.usuario.respuesta.idUsuario);
      console.log("El Rol del usuario es : ", this.usuario.respuesta.idRol);  
      
      this.numeroUsuario = this.usuario.respuesta.idUsuario;
      this.idRol = this.usuario.respuesta.idRol;
      
    });
    }

  // onChange(date) {
    
    
  //   this.fecha = date._d;

  //   function format(d) {
  //     var mm = d.getMonth() + 1; // getMonth() is zero-based
  //     var dd = d.getDate();

  //     return [d.getFullYear(), '-',
  //     (mm > 9 ? '' : '0') + mm, '-',
  //     (dd > 9 ? '' : '0') + dd
  //     ].join('');
  //   };

  //   var fechaf = format(this.fecha);

  //   // this.navCtrl.navigateRoot('/asisalumno')

  //   console.log(fechaf)

  // }

  ngOnInit() {
  }

  onClick(date,fechaf) {

    this.fecha = date._d;

    function format(d) {
      var mm = d.getMonth() + 1; // getMonth() is zero-based
      var dd = d.getDate();

      return [d.getFullYear(), '-',
      (mm > 9 ? '' : '0') + mm, '-',
      (dd > 9 ? '' : '0') + dd
      ].join('');
    };

    fechaf = format(this.fecha);
    this.navCtrl.navigateRoot('/horarios/' + fechaf)
    console.log(fechaf)
  }
  

}
