import { PinjamanService } from './../notifications/pinjaman.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatablesRequest } from 'app/layouts/login-page/model/datatablerequest';
import { PinjamanParameter } from 'app/layouts/login-page/model/pinjaman';

@Component({
  selector: 'app-bayar-pinjaman',
  templateUrl: './bayar-pinjaman.component.html',
  styleUrls: ['./bayar-pinjaman.component.css']
})
export class BayarPinjamanComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private service : PinjamanService
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
        dataTablesParameters.extraParam = dataParam;
        this.service.datatablesBayar(dataTablesParameters).subscribe(resp => {
          callback({
            recordsTotal: resp.recordTotal,
            recordsFiltered: resp.recordFiltered,
            data: resp.data,
            draw: resp.draw
          });
        });
      },
      columns: [{
        width: '10%',
        title: 'No',
        data: 'no',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '10%',
        title: 'NIP',
        data: 'nip',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '10%',
        title: 'No Pinjaman',
        data: 'noPinjaman',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '18%',
        title: 'Nama Nasabah',
        data: 'namaNasabah',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '18%',
        title: 'Nominal Setoran',
        data: 'nominalTransaksi',
        orderable: false,
        className: 'text-center align-middle nopadding',
        render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
      },
      {
        width: '18%',
        title: 'Tanggal Transaksi',
        data: 'tanggalTransaksi',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '18%',
        title: 'Sisa Pinjaman',
        data: 'sisaPinjaman',
        orderable: false,
        className: 'text-center align-middle nopadding',
        render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
      }
      // {
      //   width: '25%',
      //   title: 'Nominal Transaksi',
      //   data: 'nominalTransaksi',
      //   orderable: false,
      //   className: 'text-center align-middle nopadding',
      //   render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
      // }
      //   ,
      // {
      //   width: '10%',
      //   title: 'Detail',
      //   data: 'idApproval',
      //   orderable: false,
      //   render(data, type, row) {
      //     return `<button type="button" class="btn btn-primary btn-default" id="btnEdit"><i class="nc-icon nc-zoom-split"></i></button>`;
      //   },
      // }
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
          // this.open(data.idApproval);
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

}
