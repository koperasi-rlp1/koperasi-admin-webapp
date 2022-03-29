import { DataKoperasiComponent } from './../../pages/data-koperasi/data-koperasi.component';
import { DataNasabahComponent } from './../../pages/data-nasabah/data-nasabah.component';
import { SetoranComponent } from './../../pages/setoran/setoran.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'konfirmasi-pinjaman',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'pinjaman-pembayaran',        component: SetoranComponent },
    { path: 'data-nasabah',        component: DataNasabahComponent },
    { path: 'data-koperasi',        component: DataKoperasiComponent }
];
