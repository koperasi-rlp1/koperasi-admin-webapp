import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatatablesRequest } from 'app/layouts/login-page/model/datatablerequest';
import { DatatablesResponse } from 'app/layouts/login-page/model/datatableresponse';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PinjamanService {

  constructor(
    private http : HttpClient
  ) { }

  public datatablesApproval(params : any) : Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = params.draw;
    param.length = params.length;
    param.start = params.start;
    param.sortCol = params.order[0].column;
    param.sortDir = params.order[0].dir;
    param.extraParam =  params.extraParam;
    return this.http.post(environment.urlAdmin +'/pinjaman/datatablesApproval', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  public datatablesConfirm(params : any) : Observable<DatatablesResponse>{
    const param = new DatatablesRequest();
    param.draw = params.draw;
    param.length = params.length;
    param.start = params.start;
    param.sortCol = params.order[0].column;
    param.sortDir = params.order[0].dir;
    param.extraParam =  params.extraParam;
    return this.http.post(environment.urlAdmin +'/pinjaman/datatablesConfirm', param)
    .pipe(map(data => data as DatatablesResponse));
  }

  public getDataTransaksiApproval(idApproval : any){
    return this.http.get<any>(`${environment.urlAdmin}/pinjaman/data-by/${idApproval}`, {observe : 'response'});
  }

  public getDataTransaksi(idApproval : any){
    return this.http.get<any>(`${environment.urlAdmin}/pinjaman/data-transaksi-by/${idApproval}`, {observe : 'response'});
  }

  public transactional(transaksi : any){
    return this.http.post<any>(`${environment.urlAdmin}/pinjaman/transactional`, transaksi, {observe : 'response'});
  }

  public update(transaksi : any){
    return this.http.put<any>(`${environment.urlAdmin}/pinjaman/konfirmasi-pinjaman`, transaksi, {observe : 'response'});
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', environment.urlAdmin + '/pinjaman/filesupload', formData, {
        reportProgress: true,
        responseType: 'json'
    });

    return this.http.request(req);
  }
}
