import { Component, OnInit } from '@angular/core';
import { LoginService } from "src/app/servicios/login.service";
import { ActivatedRoute } from "@angular/router";
import { LoadingController, NavParams } from '@ionic/angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-asisalumno',
  templateUrl: './asisalumno.page.html',
  styleUrls: ['./asisalumno.page.scss'],
})
export class AsisalumnoPage implements OnInit {

  idClase: string;
  listado: any;
  idUsuario : string;
  nombre: string;
  profesor: string;
  usuario:any;
  idUser: string;

  urlapi="http://3.133.28.198:8080/Wod/"

  constructor(
    private servicio: LoginService,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    private storage: Storage, 
    private navParams: NavParams
  ) 
    {
      this.usuario = this.navParams.get(this.usuario);
      this.storage.get("userData").then((user) => {
      this.usuario = user;

      console.log("El usuario en MENU es :",this.usuario.respuesta.nombre);
      console.log("Y su Rol es :", this.usuario.respuesta.idRol);
      console.log("El ID es :", this.usuario.respuesta.idUsuario);
      
      this.idUser = this.usuario.respuesta.idUsuario;

      console.log(this.idUser);
      
    });
    }

   

  ionViewWillEnter(){

    this.idUsuario = this.activatedRoute.snapshot.paramMap.get('idusuario');
    this.usuario = this.activatedRoute.snapshot.paramMap.get('usuario');    
   
    this.servicio.getData(this.urlapi+'Usuarios/usuario/'+this.usuario+'/').subscribe(data => {
    
      console.log(data);

      this.listado=data;
      
       });
  }

  ngOnInit() {

    this.idClase = this.activatedRoute.snapshot.paramMap.get('idClase');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    this.profesor = this.activatedRoute.snapshot.paramMap.get('profesor');

    console.log("El ID de la clase es :",this.idClase);

    this.servicio.getData('http://3.133.28.198:8080/Wod/AsistenciaClases/' + this.idClase + '/').subscribe(data =>{
      console.log(data , "ngOnInit");
      this.listado=data;
    });
  }

  asistir(idUser,idClase){

    this.servicio.asistenciaAlumno(this.idUser,this.idClase).subscribe((response: any) => {
      console.log(response, "Asistencia apartada");
      
  });
  this.activandoLoading();
  }

  quitarAsistencia(idUser,idClase){

    this.servicio.eliminarAlumno(this.idUser,this.idClase).subscribe((response: any) => {
      console.log(response, "Asistencia eliminada");
      
  });
  this.asistenciaEliminada();
  }

  async activandoLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Lugar apartado',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async asistenciaEliminada() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Asistencia eliminada',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

}
