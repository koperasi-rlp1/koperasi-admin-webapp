import { Transaksi } from './../../layouts/login-page/model/transaksi';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TransaksiApproval } from './../../layouts/login-page/model/simpanan';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { DatatablesRequest } from "app/layouts/login-page/model/datatablerequest";
import { Subject } from "rxjs";
import { SimpananService } from "./simpanan.service";
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var require;
const Swal = require('sweetalert2');

@Component({
  selector: 'ngbd-modal-content',
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
                    <input class="form-control" [readonly]="true" [value]="dataTransaksi?.jenisTransaksi">
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
                <label class="col-sm-4 col-form-label">Keterangan</label>
                <div class="col-sm-8">
                    <textarea readonly class="form-control">
                      {{dataTransaksi?.deskripsi}}
                    </textarea>
                    <!-- <input class="form-control" [readonly]="true" [value]="dataTransaksi?.nominalTransaksi"> -->
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Bukti Pembayaran</label>
                <div class="col-sm-8">
                  <div class="input-group input-group-sm">
                    <img src="" alt="" width="100%">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <div class="row">
          <button type="button" class="btn btn-danger" (click)="reject(dataTransaksi, '2')">Reject</button>
          <button type="button" class="btn btn-success" (click)="approve(dataTransaksi, '1')">Approve</button>
        </div>
      </div>
  `
})
export class NgbdModalContent {
  @Input() dataTransaksi;

  approve(dataTransaksi: any, statusApproval: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Konfirmasi Simpanan',
      text: 'Anda Yakin ? Menyetujui Transaksi Berupa ' + this.dataTransaksi.jenisTransaksi + ' dari Nasabah Dengan Nama ' + this.dataTransaksi.namaNasabah,
      type: 'error',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        let transaksi = new Transaksi();
        transaksi.idApproval = dataTransaksi.idApproval;
        transaksi.idNasabah = dataTransaksi.idNasabah;
        transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
        transaksi.jenisTransaksi = dataTransaksi.jenisTransaksi;
        transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
        transaksi.buktiPembayaran = dataTransaksi.buktiPembayaran;
        transaksi.deskripsi = dataTransaksi.deskripsi;
        transaksi.statusApproval = dataTransaksi.statusApproval;
        this.service.transactional(transaksi, statusApproval).subscribe(data => {
          this.toastr.success("Transaksi Berhasil Di Approve")
          window.location.reload()
        }, error => {
          this.toastr.error("Service Gagal")
        });
      }
    });
  }

  reject(dataTransaksi: any, statusApproval: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Konfirmasi Simpanan',
      text: 'Anda Yakin ? Membatalkan Transaksi Berupa ' + this.dataTransaksi.jenisTransaksi + ' dari Nasabah Dengan Nama ' + this.dataTransaksi.namaNasabah,
      type: 'error',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        let transaksi = new Transaksi();
        transaksi.idApproval = dataTransaksi.idApproval;
        transaksi.idNasabah = dataTransaksi.idNasabah;
        transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
        transaksi.jenisTransaksi = dataTransaksi.jenisTransaksi;
        transaksi.nominalTransaksi = dataTransaksi.nominalTransaksi;
        transaksi.buktiPembayaran = dataTransaksi.buktiPembayaran;
        transaksi.deskripsi = dataTransaksi.deskripsi;
        transaksi.statusApproval = dataTransaksi.statusApproval;
        this.service.transactional(transaksi, statusApproval).subscribe(data => {
          this.toastr.success("Transaksi Berhasil Di Batalkan")
          window.location.reload()
        }, error => {
          this.toastr.error("Service Gagal")
        });
      }
    });
  }

  constructor(public activeModal: NgbActiveModal, public service: SimpananService, public toastr: ToastrService) { }
}

@Component({
  selector: "icons-cmp",
  moduleId: module.id,
  templateUrl: "icons.component.html",
})
export class IconsComponent implements OnInit, AfterViewInit {
  closeResult = '';

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  formFilter: FormGroup;

  constructor(
    private service: SimpananService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {

    this.formFilter = this._formBuilder.group({
      jenisTransaksi: this._formBuilder.control(null),
      bulanTransaksi: this._formBuilder.control(null),
      nip: this._formBuilder.control(null),
    });

    this.formFilter.patchValue({
      jenisTransaksi: "SIMPANAN WAJIB",
    });

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
        let dataParam = new TransaksiApproval();
        const value = JSON.parse(localStorage.getItem("currentLogin"));
        dataParam.jenisTransaksi = this.formFilter.get("jenisTransaksi").value;
        dataTablesParameters.extraParam = dataParam;
        this.service.datatables(dataTablesParameters).subscribe(resp => {
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
        title: 'Jenis Transaksi',
        data: 'jenisTransaksi',
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
        width: '20%',
        title: 'Nama Nasabah',
        data: 'namaNasabah',
        orderable: false,
        className: 'text-center align-middle nopadding'
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
        title: 'Keterangan',
        data: 'deskripsi',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '25%',
        title: 'Nominal Transaksi',
        data: 'nominalTransaksi',
        orderable: false,
        className: 'text-center align-middle nopadding',
        render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
      }
        ,
      {
        width: '10%',
        title: 'Detail',
        data: 'idApproval',
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
          this.open(data.idApproval);
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

  refresh(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  open(idApproval: any) {
    this.service.getDataTransaksiApproval(idApproval).subscribe(data => {
      const modalRef = this.modalService.open(NgbdModalContent, { size: 'xl' });
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
