import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { CalendarComponentOptions } from 'ion2-calendar';

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
  // _disableWeeks: number[] = [0, 6];
  usuario:any;

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
    });
    }

  ngOnInit() {
  }

  // Metodos para habilitar y deshabilitar dias en calendario

  // _changeDisableWeeks(disableWeeks: string[]) {
  //   this.options = {
  //     ...this.options,
  //     disableWeeks: disableWeeks.map(e => parseInt(e))
  //   }
  // }

  options: CalendarComponentOptions = {
    monthPickerFormat: ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays:['D', 'L', 'M', 'M', 'J', 'V', 'S']
    // Fines de semana habilitados
    // ,disableWeeks: [0, 6]
  };

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
