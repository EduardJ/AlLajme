import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { TelegrafiComponent } from './telegrafi/telegrafi.component';
import { KohaComponent } from './koha/koha.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: FrontpageComponent},
	{ path: 'frontpage', component: FrontpageComponent },
	{ path: 'telegrafi', component: TelegrafiComponent},
	{ path: 'koha', component: KohaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
