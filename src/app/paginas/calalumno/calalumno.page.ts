import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-calalumno',
  templateUrl: './calalumno.page.html',
  styleUrls: ['./calalumno.page.scss'],
})
export class CalalumnoPage implements OnInit {

  fecha
  date: string;
  type: 'string';

  constructor
    (
      public alertController: AlertController,
      public navCtrl: NavController
    ) { }

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
