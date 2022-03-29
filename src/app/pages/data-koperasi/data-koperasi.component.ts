import { ToastrService } from 'ngx-toastr';
import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-koperasi',
  templateUrl: './data-koperasi.component.html',
  styleUrls: ['./data-koperasi.component.css']
})
export class DataKoperasiComponent implements OnInit {

  dataKoperasi : any;

  constructor(
    private service : DataService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {

    this.service.getDataKoperasi().subscribe(data=> {
      this.dataKoperasi = data.body;
      this.toastr.success("Berhasil Mendapatkan Data Koperasi")
    })
  }

}
