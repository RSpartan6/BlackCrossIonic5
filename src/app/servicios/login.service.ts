import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
// import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: "root",
})
export class LoginService {
  url = "http://3.133.28.198:8080/Wod/";
  httpOptions;

  // url = 'http://3.133.28.198:8080/'

  constructor(private http: HttpClient) {
    console.log("Servicio de login");
  }

  getData(url) {
    return this.http.get(`${url}`);
  }

  editarUsuario(editar) {
    editar = JSON.stringify(editar);
    console.log(editar,"Editar service");
    return this.http.put(this.url + "Usuarios", editar, this.httpOptions);
  }

  // Servicio cambiar status
  activarUser(idUsuario) {
    return this.http.put(this.url + "Usuarios/" + idUsuario + "/1", this.httpOptions);

  }

  desactivarUser(idUsuario) {
    return this.http.put(this.url + "Usuarios/" + idUsuario + "/0", this.httpOptions);
  }

  // Servicio de apartar lugar

  asistenciaAlumno(idClase, idUsuario, fecha) {

    return this.http.post(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha, this.httpOptions);
  }


  // Servicio eliminar asistencia
  eliminarAlumno(idUsuario, idClase, fecha) {
    return this.http.delete(this.url + "AsistenciaClases/" + idClase + "/" + idUsuario + '?fecha=' + fecha, this.httpOptions);
  }

  // Servicio crear nuevo usuario
  setCrear(clase) {
    clase = JSON.stringify(clase);
    console.log(clase);
    return this.http.post(this.url + 'Usuarios/', clase, this.httpOptions)
  }

  // Editar password (usuario)

  cambiarPass(pass) {
    pass = JSON.stringify(pass);
    console.log(pass);
    return this.http.put(this.url + "Usuarios/cambio-contrasenia/", pass, this.httpOptions);
  }

  // Recuperar Pass

  recuperarPass(pass) {
    pass = JSON.stringify(pass);
    console.log(pass);
    return this.http.put(this.url + "Usuarios/", pass, this.httpOptions);
  }


  // Servicio crear clase

  setNuevaclase(nClase) {
    nClase = JSON.stringify(nClase);
    console.log(nClase);
    return this.http.post(this.url + 'Clases',nClase, this.httpOptions)
  }

  // Editar Clase

  editarClase(edit) {
    edit = JSON.stringify(edit);
    console.log(edit);
    return this.http.put(this.url + 'Clases',edit, this.httpOptions)
  }

  // Eliminar Clase

  eliminarClase(idClase) {
    return this.http.delete(this.url + "Clases/" + idClase, this.httpOptions);
  }

  // Servicio de Login
  login(user) {
    console.log(user, "Bienvenido");
    return this.http
      .post(
        "http://3.133.28.198:8080/Wod/IniciarSesion?usuario=" +
        user.usuario +
        "&contrasenia=" +
        user.contrasenia,
        {}
      )
      .pipe();
  }

  loginPost(user) {
    console.log(user, "Bienvenido");
    user = JSON.stringify(user);
    console.log(user);
    return this.http.post(this.url + 'IniciarSesion/iniciar-sesion', user, this.httpOptions)
  }
}
