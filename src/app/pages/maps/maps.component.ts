import { NasabahService } from './nasabah.service';
import { Component,OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

declare var require;
const Swal = require('sweetalert2');

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {
  closeResult = '';
  listNasabahApproval : Array<any> = null;
  content : any;
  dataNasabah : any;

    constructor(
      // private router : Router,
      private _toastr : ToastrService,
      // private httpKlien : HttpClient,
      // private titleService : Title,
      // private formBuilder : FormBuilder
      private service : NasabahService,
      private modalService: NgbModal
    ) { }

    ngOnInit() {
        // var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        // var mapOptions = {
        //   zoom: 13,
        //   center: myLatlng,
        //   scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        //   styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

        // }
        // var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // var marker = new google.maps.Marker({
        //     position: myLatlng,
        //     title:"Hello World!"
        // });

        // To add the marker to the map, call setMap();
        // marker.setMap(map);

        this.service.getDataApproval().subscribe(data => {
          this.listNasabahApproval = data.body;
        })
    }

    getData(id){
      this.service.getDataNasabah(id).subscribe(data => {
        this.dataNasabah = data.body;
      })
    }

    open(content, id : string) {
      this.getData(id);
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    approve(){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
        title: 'Konfirmasi Nasabah',
        text: 'Anda Yakin ? || Konfirmasi Nasabah dengan NIP : ' + this.dataNasabah.nip,
        type: 'error',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
          this.service.approveNasabah(this.dataNasabah).subscribe(response => {
            this._toastr.success(response.body);
            this.getDismissReason('Cross click');
            window.location.reload();
          }, error => {
            if(error.status == 200){
              this._toastr.success(error.body);
              this.getDismissReason('Cross click');
              window.location.reload();
            }
          })
        }
      });
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
