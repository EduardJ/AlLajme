import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//forms
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

//material
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
  
//components
import { FrontpageComponent } from './frontpage/frontpage.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { TelegrafiComponent } from './telegrafi/telegrafi.component';
import { KohaComponent } from './koha/koha.component';
import { IndeksonlineComponent } from './indeksonline/indeksonline.component';
import { GazetaexpressComponent } from './gazetaexpress/gazetaexpress.component';
import { InsajderComponent } from './insajder/insajder.component';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';


//Firebase realated imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Authentication
import { AuthService } from './core/auth.service';



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
    DialogComponent,
    LoginComponent,
    UserComponent
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
    AngularFirestoreModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    AngularFireAuthModule
  ],

  entryComponents: [
    DialogComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
