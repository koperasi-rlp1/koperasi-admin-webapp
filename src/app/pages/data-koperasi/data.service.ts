import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatatablesRequest } from 'app/layouts/login-page/model/datatablerequest';
import { DatatablesResponse } from 'app/layouts/login-page/model/datatableresponse';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
    return this.http.post(environment.urlAdmin +'/transaksi/datatablesDataNasabah', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  public getDataKoperasi(){
    return this.http.get<any>(`${environment.urlAdmin}/transaksi/data-koperasi`, {observe : 'response'});
  }
}
