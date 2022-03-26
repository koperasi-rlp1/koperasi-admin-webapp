import { DatatablesRequest } from './../../layouts/login-page/model/datatablerequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatablesResponse } from 'app/layouts/login-page/model/datatableresponse';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimpananService {

  constructor(
    private http : HttpClient
  ) { }

  public datatables(params : any) : Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = params.draw;
    param.length = params.length;
    param.start = params.start;
    param.sortCol = params.order[0].column;
    param.sortDir = params.order[0].dir;
    param.extraParam =  params.extraParam;
    return this.http.post(environment.urlAdmin +'/transaksi-approval/datatables', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  public getDataTransaksiApproval(idApproval : any){
    return this.http.get<any>(`${environment.urlAdmin}/transaksi-approval/data-by/${idApproval}`, {observe : 'response'});
  }

  public transactional(transaksi : any, statusApproval){
    return this.http.post<any>(`${environment.urlAdmin}/transaksi/transactional/${statusApproval}`, transaksi, {observe : 'response'});
  }
}
