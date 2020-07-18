import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-caladmin',
  templateUrl: './caladmin.page.html',
  styleUrls: ['./caladmin.page.scss'],
})
export class CaladminPage implements OnInit {

  fechaf
  fecha
  date: string;
  type: 'string';

  constructor
    (
      public alertController: AlertController,
      public navCtrl: NavController
    ) { }

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
    this.navCtrl.navigateRoot('/horariosadmin/' + fechaf)
    console.log(fechaf)
  }

}
