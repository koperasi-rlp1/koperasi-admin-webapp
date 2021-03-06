import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "", class: "" },
  { path: "/icons", title: "Konfirmasi Pembayaran", icon: "", class: "" },
  { path: "/maps", title: "Konfirmasi Keanggotaan", icon: "", class: "" },
  { path: "/konfirmasi-pinjaman", title: "Konfirmasi Pinjaman", icon: "", class: "" },
  { path: "/pinjaman-pembayaran", title: "Pinjaman Pembayaran", icon: "", class: "" },
  { path: "/setoran-pinjaman", title: "Setoran Pinjaman", icon: "", class: "" },
  { path: "/data-nasabah", title: "Data Nasabah", icon: "", class: "" },
  { path: "/data-koperasi", title: "Data Koperasi", icon: "", class: "" },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
