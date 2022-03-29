import { DataService } from './../data-koperasi/data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatatablesRequest } from 'app/layouts/login-page/model/datatablerequest';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataNasabah } from '../data-koperasi/data';

@Component({
  selector: 'app-data-nasabah',
  templateUrl: './data-nasabah.component.html',
  styleUrls: ['./data-nasabah.component.css']
})
export class DataNasabahComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject();


  constructor(
    private service: DataService,
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
        let dataParam = new DataNasabah();
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
        width: '10%',
        title: 'No',
        data: 'no',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '18%',
        title: 'NIP',
        data: 'nip',
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
        title: 'Email',
        data: 'email',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '18%',
        title: 'No HP',
        data: 'noHp',
        orderable: false,
        className: 'text-center align-middle nopadding'
      },
      {
        width: '18%',
        title: 'Jumlah Simpanan',
        data: 'jumlahSimpanan',
        orderable: false,
        className: 'text-center align-middle nopadding',
        render: $.fn.dataTable.render.number('.', ',', 2, 'Rp ')
      },
      {
        width: '18%',
        title: 'Jumlah Pinjaman',
        data: 'jumlahPinjaman',
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
