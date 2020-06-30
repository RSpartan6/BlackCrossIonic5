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

  // Servicio editar Usuario
  editarUsuario(usuario) {
    console.log(usuario);
    return this.http.put(this.url + "Usuarios/", usuario, this.httpOptions);
  }

  // Servicio crear nuevo usuario
  setCrear(clase) {
    clase = JSON.stringify(clase);
    console.log(clase);
    return this.http.post(this.url + 'Usuarios/', clase, this.httpOptions)
  }

  // Servicio de Login
  login(user) {
    console.log(user, "Bienvenido");

    // console.log(user.usuario);
    // console.log(user.contrasenia);

    // let usuario = {
    //   'usuario': user.usuario,
    //   'contrasenia': user.contrasenia
    // }

    return this.http
      .post(
        "http://3.133.28.198:8080/Wod/IniciarSesion?usuario=" +
          user.usuario +
          "&contrasenia=" +
          user.contrasenia,
        {}
      )
      .pipe();

    // (
    //   tap(resp => console.log('heaeder', resp.headers.get('ReturnStatus')))
    // );
  }

  // Servicio de Eliminar asistencia
}
