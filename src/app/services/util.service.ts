import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  getUserName(name: string) {
    if (name.length && name.indexOf('/') != -1) {
      return name.split('/')[0];
    }
  }
  stopPropagation(ev:Event) {
    ev.stopPropagation();
  }
  showSnackbar(msg: string) {
    let x = document.getElementById("snackbar");
    x.innerHTML = msg;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }
}
