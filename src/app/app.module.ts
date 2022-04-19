import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DataTablesModule } from 'angular-datatables';
import { UserComponent } from './pages/user/user.component';
import { TableComponent } from './pages/table/table.component';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SetoranComponent } from './pages/setoran/setoran.component';
import { DataNasabahComponent } from './pages/data-nasabah/data-nasabah.component';
import { DataKoperasiComponent } from './pages/data-koperasi/data-koperasi.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { BayarPinjamanComponent } from './pages/bayar-pinjaman/bayar-pinjaman.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    SetoranComponent,
    DataNasabahComponent,
    DataKoperasiComponent,
    BayarPinjamanComponent

  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
