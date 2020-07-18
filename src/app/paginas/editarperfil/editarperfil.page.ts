import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {

  urlapi="http://3.133.28.198:8080/Wod/"

  ep={
    "idRol": "",
    "usuario":"",
    "contrasenia":"",
    "nombre":"",
    "sexo":"",
    "correo_electronico":"",
    "peso":"",
    "altura":"--",
    "imc":"--",
    "telefono":"",
    "nivel": "",
    "estatus":"",
    "intentos":"",
  }

  usuario: string;
  sexo: string;
  correoElectronico: string;
  nombre: string;
  telefono: string;
  contrasenia: string;
  estatus: string;

  listado:any;

  constructor
  (
    private activatedRoute: ActivatedRoute, 
    private servicio: LoginService,
    // public navCtrl: NavController,
    // public navCtrl: NavController,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ionViewWillEnter(){
   
    this.usuario = this.activatedRoute.snapshot.paramMap.get('usuario');
    this.sexo = this.activatedRoute.snapshot.paramMap.get('sexo');
    this.correoElectronico = this.activatedRoute.snapshot.paramMap.get('correoElectronico');
    this.nombre =this.activatedRoute.snapshot.paramMap.get('nombre');
    this.telefono =this.activatedRoute.snapshot.paramMap.get('telefono');
    this.contrasenia =this.activatedRoute.snapshot.paramMap.get('contrasenia');
    this.estatus = this.activatedRoute.snapshot.paramMap.get('estatus');

    console.log(this.usuario, "Usuario");
    
   
    this.servicio.getData(this.urlapi+'Usuarios/usuario/'+this.usuario+'/').subscribe(data => {
    
      console.log(data);

      this.listado=data;
      
       });
  }

  editarUsuario(){
    let obj = {
      "idRol": 2,
      "usuario":this.usuario,
      "contrasenia":this.contrasenia,
      "nombre":this.nombre,
      "sexo":this.sexo,
      "correoElectronico":this.correoElectronico,
      "peso":0,
      "altura":0,
      "imc":"--",
      "telefono":this.telefono,
      "nivel": "10" ,
      "estatus":this.estatus,
      "intentos":0,
    }   

    this.presentLoading();
    this.servicio.editarUsuario(obj).subscribe((response: any) => {
          console.log(response, "Editar Usuario method");
      });
    console.log(obj, "ep");
    // this.navCtrl.push(PerfilPage)
  }

  
  activarUser(idUsuario){

    this.servicio.activarUser(idUsuario).subscribe((response: any) => {
      console.log(response, "Usuario Activado");
  });
  this.activandoLoading();
  }

  desactivarUser(idUsuario){

    this.servicio.desactivarUser(idUsuario).subscribe((response: any) => {
      console.log(response, "Usuario Desactivado");
  });
  this.desacactivadoLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Por favor espere...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async activandoLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Usuario Activado',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async desacactivadoLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      spinner: "crescent",
      message: 'Usuario Desactivado',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ngOnInit() {
  }

}
