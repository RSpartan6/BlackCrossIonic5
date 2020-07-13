import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-calalumno',
  templateUrl: './calalumno.page.html',
  styleUrls: ['./calalumno.page.scss'],
})
export class CalalumnoPage implements OnInit {
  
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


  // async asistencia() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Desea asistir  ',
  //     buttons: [
  //       {
  //         text: 'Eliminar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
            
  //         }
  //       }, {
  //         text: 'Asistir',
  //         handler: () => {
  //           console.log('Confirm Okay');
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }
  

}
