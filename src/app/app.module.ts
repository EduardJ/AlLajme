import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatDialogModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';


//components
import { FrontpageComponent } from './frontpage/frontpage.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { TelegrafiComponent } from './telegrafi/telegrafi.component';
import { KohaComponent } from './koha/koha.component';
import { IndeksonlineComponent } from './indeksonline/indeksonline.component';
import { GazetaexpressComponent } from './gazetaexpress/gazetaexpress.component';
import { InsajderComponent } from './insajder/insajder.component';
import { DialogComponent } from './dialog/dialog.component';


//Firebase realated imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    TelegrafiComponent,
    MainNavComponent,
    KohaComponent,
    IndeksonlineComponent,
    GazetaexpressComponent,
    InsajderComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule

  ],

  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
