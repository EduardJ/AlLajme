import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { TelegrafiComponent } from './telegrafi/telegrafi.component';
import { KohaComponent } from './koha/koha.component';

import { IndeksonlineComponent } from './indeksonline/indeksonline.component';
import { InsajderComponent } from './insajder/insajder.component';
import { GazetaexpressComponent } from './gazetaexpress/gazetaexpress.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: FrontpageComponent},
	{ path: 'frontpage', component: FrontpageComponent },
	{ path: 'telegrafi', component: TelegrafiComponent},
	{ path: 'koha', component: KohaComponent},
	{ path: 'indeksonline', component: IndeksonlineComponent},
	{ path: 'insajder', component: InsajderComponent},
	{ path: 'gazetaexpress', component: GazetaexpressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
