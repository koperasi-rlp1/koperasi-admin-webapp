import { PinjamanApproval, PinjamanParameter } from './../../layouts/login-page/model/pinjaman';
import { PinjamanService } from './pinjaman.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from "ngx-toastr";
import { Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatablesRequest } from 'app/layouts/login-page/model/datatablerequest';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'ngbd-approval-content',
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
          <div class="row p-t-10">
            <div class="col col-xl-6 col-lg-6 col-md-6 col-xs-12 col-sm-12">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Jenis Transaksi</label>
                <div class="col-sm-8">
                  <div class="input-group input-group-sm">
                    <input class="form-control" [readonly]="true" value="PINJAMAN">
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">NIP</label>
                <div class="col-sm-8">
                  <div class="input-group input-group-sm">
                    <input class="form-control" [readonly]="true" [value]="dataTransaksi?.nip">
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Nama Nasabah</label>
                <div class="col-sm-8">
                  <div class="input-group input-group-sm">
                    <input class="form-control" [readonly]="true" [value]="dataTransaksi?.namaNasabah">
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Tanggal Transaksi</label>
                <div class="col-sm-8">
                  <div class="input-group input-group-sm">
                    <input class="form-control" [readonly]="true" [value]="dataTransaksi?.tanggal">
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-xl-6 col-lg-6 col-md-6 col-xs-10 col-sm-10">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Nominal Transaksi</label>
                <div class="col-sm-8">
                  <div class="input-group input-group-sm">
                    <input class="form-control" [readonly]="true" [value]="dataTransaksi?.nominalTransaksi">
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Bulan Bayar</label>
                <div class="col-sm-8">
                  <div class="input-group input-group-sm">
                    <input class="form-control" [readonly]="true" [value]="dataTransaksi?.bulanBayar">
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Tujuan Pinjam</label>
                <div class="col-sm-8">
                    <textarea readonly class="form-control">
                      {{dataTransaksi?.tujuanPinjam}}
                    </textarea>
                    <!-- <input class="form-control" [readonly]="true" [value]="dataTransaksi?.nominalTransaksi"> -->
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Alasan Tolak (Isi Bila Akan Menolak)</label>
                <div class="col-sm-8">
                    <textarea class="form-control"
                      [(ngModel)]="dataTransaksi.alasanTolak">
                      {{dataTransaksi?.alasanTolak}}
                    </textarea>
                    <!-- <input class="form-control" [readonly]="true" [value]="dataTransaksi?.nominalTransaksi"> -->
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div class="row">
          <button type="button" class="btn btn-danger" (click)="reject(dataTransaksi)">Reject</button>
          <button type="button" class="btn btn-success" (click)="approve(dataTransaksi)">Approve</button>
        </div>
      </div>
  `
})
export class ApprovalContent {
  @Input() dataTransaksi;

  approve(dataTransaksi: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Konfirmasi Pinjaman',
      text: 'Anda Yakin ? Menyetujui Transaksi Berupa ' + 'PINJAMAN sebesar RP.'+ this.dataTransaksi.nominalTransaksi + ' dari Nasabah Dengan Nama ' + this.dataTransaksi.namaNasabah,
      type: 'error',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        let transaksi = new PinjamanParameter();
        transaksi.idApproval = dataTransaksi.id;
        transaksi.idNasabah = dataTransaksi.idNasabah;
        transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
        transaksi.bulanBayar = dataTransaksi.bulanBayar;
        transaksi.tujuanPinjam = dataTransaksi.tujuanPinjam;
        transaksi.statusTransaksi = "approve";
        this.service.transactional(transaksi).subscribe(data => {
          this.toastr.success("Pinjaman Berhasil Di Approve")
        }, error => {
          this.toastr.error("Service Gagal")
        });
      }
    });
  }

  reject(dataTransaksi: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Konfirmasi Pinjaman',
      text: 'Anda Yakin ? Membatalkan Transaksi Berupa ' + this.dataTransaksi.jenisTransaksi + ' dari Nasabah Dengan Nama ' + this.dataTransaksi.namaNasabah,
      type: 'error',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        let transaksi = new PinjamanParameter();
        transaksi.idApproval = dataTransaksi.id;
        transaksi.idNasabah = dataTransaksi.idNasabah;
        transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
        transaksi.bulanBayar = dataTransaksi.bulanBayar;
        transaksi.tujuanPinjam = dataTransaksi.tujuanPinjam;
        transaksi.alasanTolak = dataTransaksi.alasanTolak;
        transaksi.statusTransaksi = "tolak";
        this.service.transactional(transaksi).subscribe(data => {
          this.toastr.success("Pinjaman Berhasil Di Tolak")
        }, error => {
          this.toastr.error("Service Gagal")
        });
      }
    });
  }

  constructor(public activeModal: NgbActiveModal, public service: PinjamanService, public toastr: ToastrService) { }
}

@Component({
  selector: 'notifications-cmp',
  moduleId: module.id,
  templateUrl: 'notifications.component.html'
})

export class NotificationsComponent implements OnInit, AfterViewInit {
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
        let dataParam = new PinjamanApproval();
        const value = JSON.parse(localStorage.getItem("currentLogin"));
        dataTablesParameters.extraParam = dataParam;
        this.service.datatablesApproval(dataTablesParameters).subscribe(resp => {
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
        title: 'Tanggal',
        data: 'tanggal',
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
    this.service.getDataTransaksiApproval(idApproval).subscribe(data => {
      const modalRef = this.modalService.open(ApprovalContent, { size: 'xl' });
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
