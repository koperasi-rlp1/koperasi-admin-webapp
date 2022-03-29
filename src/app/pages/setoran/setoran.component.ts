import { Pinjaman, PinjamanParameter } from './../../layouts/login-page/model/pinjaman';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { DatatablesRequest } from 'app/layouts/login-page/model/datatablerequest';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PinjamanService } from '../notifications/pinjaman.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'ngbd-pembayaran-content',
  template: `
     <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">Detail Pengajuan Simpanan</h4>
        <button type="button" class="btn btn-danger" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <i class="nc-icon nc-simple-remove"></i>
        </button>
      </div>
      <div class="modal-body">
        <form class="form theme-form">
          <!-- kolom 1 -->
            <label class="col-sm-4 col-form-label">File Bukti Pengiriman Uang Pinjaman</label>
          <div class="custom-file">
            <input type="file" (change)="selectFile($event)" class="custom-file-input" id="inputGroupFile04" accept="image/*">
            <label class="custom-file-label" id="label-file" for="inputGroupFile04">Choose file</label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div class="row">
          <button type="button" class="btn btn-success" (click)="approve(dataTransaksi)">Kirim</button>
        </div>
      </div>
  `
})
export class PembayaranContent {
  @Input() dataTransaksi;


  selectedFiles: FileList;
  currentFile: File;
  progress = 0;


  selectFile(event){
    var filename = event.target.files[0].name;
    $("#label-file").text(filename);
    this.selectedFiles = event.target.files;
  }

  approve(dataTransaksi: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Konfirmasi Pembayaran',
      text: 'Anda Yakin ? Kirim Transaksi Berupa ' + 'PINJAMAN sebesar RP.'+ this.dataTransaksi.nominalPinjaman + ' dari Nasabah Dengan Nama ' + this.dataTransaksi.namaNasabah,
      type: 'error',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        // let transaksi = new PinjamanParameter();
        // transaksi.idApproval = dataTransaksi.id;
        // transaksi.idNasabah = dataTransaksi.idNasabah;
        // transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
        // transaksi.bulanBayar = dataTransaksi.bulanBayar;
        // transaksi.tujuanPinjam = dataTransaksi.tujuanPinjam;
        // transaksi.statusTransaksi = "approve";
        // this.service.transactional(transaksi).subscribe(data => {
        //   this.toastr.success("Pinjaman Berhasil Di Approve")
        // }, error => {
        //   this.toastr.error("Service Gagal")
        // });
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        console.log(this.currentFile);
        let data = new Pinjaman();
        data.id  = this.dataTransaksi.id;
        data.statusTransaksi = "confirm";
        if(this.currentFile != undefined){
          this.service.upload(this.currentFile).subscribe(
            event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round( 100 * event.loaded / event.total);
              }else if (event instanceof HttpResponse) {
                console.log(event.body);
                data.buktiPembayaran = event.body.file;
                this.service.update(data).subscribe(
                  event => {
                    this.toastr.success("Data Telah Konfirmasi");
                    // window.location.reload();
                  },
                  err => {
                    this.progress = 0;
                    this.toastr.error("Terjadi Kesalahan");
                    this.currentFile = undefined;
                  });
              }
            },
            err => {
              this.progress = 0;
              alert('Could not upload the file!');
              this.currentFile = undefined;
            });
        } else {
          this.toastr.error("Bukti Pembayaran Tidak Valid");
        }
      }
    });
  }

  // reject(dataTransaksi: any) {
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger'
  //     },
  //     buttonsStyling: false,
  //   });
  //   swalWithBootstrapButtons.fire({
  //     title: 'Konfirmasi Simpanan',
  //     text: 'Anda Yakin ? Membatalkan Transaksi Berupa ' + this.dataTransaksi.jenisTransaksi + ' dari Nasabah Dengan Nama ' + this.dataTransaksi.namaNasabah,
  //     type: 'error',
  //     showCancelButton: true,
  //     showCloseButton: true,
  //     confirmButtonText: 'Ya',
  //     cancelButtonText: 'Tidak',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.value) {
  //       let transaksi = new PinjamanParameter();
  //       transaksi.idApproval = dataTransaksi.id;
  //       transaksi.idNasabah = dataTransaksi.idNasabah;
  //       transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
  //       transaksi.bulanBayar = dataTransaksi.bulanBayar;
  //       transaksi.tujuanPinjam = dataTransaksi.tujuanPinjam;
  //       transaksi.alasanTolak = dataTransaksi.alasanTolak;
  //       transaksi.statusTransaksi = "tolak";
  //       this.service.transactional(transaksi).subscribe(data => {
  //         this.toastr.success("Pinjaman Berhasil Di Tolak")
  //       }, error => {
  //         this.toastr.error("Service Gagal")
  //       });
  //     }
  //   });
  // }

  constructor(public activeModal: NgbActiveModal, public service: PinjamanService, public toastr: ToastrService) { }
}

@Component({
  selector: 'app-setoran',
  templateUrl: './setoran.component.html',
  styleUrls: ['./setoran.component.css']
})
export class SetoranComponent implements OnInit,  AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();


  constructor(
    private service: PinjamanService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.getData()

  }

  getData() {
    this.dtOptions = {
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
      pagingType: 'full_numbers',
      serverSide: true,
      searching: false,
      processing: true,
      autoWidth: false,
      dom: 't<\'row\'<\'col-sm-12\'ip><\'col-sm-12\'l>>',
      order: [1, 'desc'],
      ajax: (dataTablesParameters: DatatablesRequest, callback) => {
        let dataParam = new PinjamanParameter();
        const value = JSON.parse(localStorage.getItem("currentLogin"));
        dataTablesParameters.extraParam = dataParam;
        this.service.datatablesConfirm(dataTablesParameters).subscribe(resp => {
          callback({
            recordsTotal: resp.recordTotal,
            recordsFiltered: resp.recordFiltered,
            data: resp.data,
            draw: resp.draw
          });
        });
      },
      columns: [{
        width: '5%',
        title: 'No',
        data: 'no',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '20%',
        title: 'Nama Nasabah',
        data: 'namaNasabah',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '5%',
        title: 'NIP',
        data: 'nip',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '25%',
        title: 'Nominal Pinjaman',
        data: 'nominalTransaksi',
        orderable: false,
        className: 'text-center align-middle nopadding',
        render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
      },
      {
        width: '10%',
        title: 'Tanggal Approve',
        data: 'tanggalApprove',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '25%',
        title: 'Tujuan Peminjaman',
        data: 'tujuanPinjam',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '20%',
        title: 'Bulan Bayar',
        data: 'bulanBayar',
        orderable: false,
        className: 'text-center align-middle nopadding'
      }
        ,
      {
        width: '10%',
        title: 'Detail',
        data: 'id',
        orderable: false,
        render(data, type, row) {
          return `<button type="button" class="btn btn-primary btn-default" id="btnEdit"><i class="nc-icon nc-zoom-split"></i></button>`;
        },
      }
        // {
        //   title : 'delete',
        //   data : 'id',
        //   orderable: false,
        //   render(data, type, row){
        //     return `<button type="button" class="btn btn-dark btn-default delete" data-element-id="${row.id}">
        //     Delete</button>`;
        //   },
        // }
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        $('#btnEdit', row).click(() => {
          // this.router.navigate(['/admin-page/arsip/edit/'+data.id]);
          this.open(data.id);
        });
      }
    };

    //   document.querySelector('body').addEventListener('click', (event) => {
    //   let target = <Element>event.target;
    //   if(target.tagName.toLowerCase() === 'button' && $(target).hasClass('delete')) {
    //     const swalWithBootstrapButtons = Swal.mixin({
    //       customClass: {
    //         confirmButton: 'btn btn-success',
    //         cancelButton: 'btn btn-danger'
    //       },
    //       buttonsStyling: false,
    //     });
    //     swalWithBootstrapButtons.fire({
    //       title: 'Yakin?',
    //       text: 'Data yang sudah di hapus tak bisa dikembalikan!',
    //       icon: 'warning',
    //       // type: 'warning'
    //       showCancelButton: true,
    //       showCloseButton: true,
    //       confirmButtonText: 'delete!',
    //       cancelButtonText: 'cancel!',
    //       reverseButtons: true
    //     }).then((_result) => {
    //     if (_result.value) {
    //       console.log(`Delete Data By Id`);
    //       this.service.delete(target.getAttribute('data-element-id')).subscribe(resp => {
    //         this._toastr.success("Data telah dihapus");
    //         console.log(resp);
    //         window.location.reload();
    //       }, error => {
    //         console.error(error.message);
    //       });
    //     } else {
    //     }
    //   });
    //   }
    // }
    // );


  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
  }

  open(idApproval: any) {
    this.service.getDataTransaksi(idApproval).subscribe(data => {
      const modalRef = this.modalService.open(PembayaranContent, { size: 'lg' });
      modalRef.componentInstance.dataTransaksi = data.body;
    }, error => {
      this.toastr.error("Gagal Mendapatkan Data Simpanan")
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
