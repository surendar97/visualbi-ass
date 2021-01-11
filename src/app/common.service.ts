import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isLoading = false;

  constructor(public http: HttpClient,
    private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getSongs(): Observable<any> {
    const url = `https://jsonplaceholder.typicode.com/photos`;
    return this.http.get(url);
  }

  getPlayList(): Observable<any> {
    const url = `https://jsonplaceholder.typicode.com/albums`;
    return this.http.get(url);
  }

}
