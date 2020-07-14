import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-calalumno',
  templateUrl: './calalumno.page.html',
  styleUrls: ['./calalumno.page.scss'],
})
export class CalalumnoPage implements OnInit {
  
  fecha
  date: string;
  type: 'moment';

  constructor  
  (
    public alertController: AlertController,
    public navCtrl : NavController
   ) 
  { }

  onChange($event) {
    console.log($event)

  }

  ngOnInit() {
  }


  // Ese metodo es el que llama muestra la cadena que te mande

  onClick(date){

    this.fecha = date._d;    
    //   formatearFecha = function(d) {
    //   var mm = d.getMonth() + 1; // getMonth() is zero-based
    //   var dd = d.getDate();
    
    //   return [d.getFullYear(),'-',
    //           (mm>9 ? '' : '0') + mm,'-',
    //           (dd>9 ? '' : '0') + dd
    //          ].join('');
    // };    
    // var date1 = new Date();    
    // console.log("f:"+d(this.fecha))
    console.log(this.fecha); 
    console.log(date, "Cadena completa");
       
  }

}
