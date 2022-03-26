import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NasabahService {

  constructor(
    private http : HttpClient
  ) { }

  public getDataApproval(){
    return this.http.get<any>(`${environment.urlAdmin}/nasabah/data-aprroval`, {observe : 'response'});
  }

  public getDataNasabah(idBakcup : any){
    return this.http.get<any>(`${environment.urlAdmin}/nasabah/data-by/${idBakcup}`, {observe : 'response'});
  }

  public approveNasabah(nasabahRequest : any){
    return this.http.put<any>(`${environment.urlAdmin}/nasabah/konfirmasiPembayaran`, nasabahRequest, {observe : 'response'});
  }
}
