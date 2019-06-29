import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerService } from './services/player.service';
import { SquadService } from './services/squad.service';
import { FixtureService } from './services/fixture.service';
import { HttpClientModule } from '@angular/common/http';
import { SquadComponent } from './squad/squad.component';
import { FixtureComponent } from './fixture/fixture.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { SquadListComponent } from './squad-list/squad-list.component';
import { FixtureListComponent } from './fixture-list/fixture-list.component';
import { AddFixtureComponent } from './add-fixture/add-fixture.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { MAT_DATE_LOCALE, MatIconModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FilterDivisionsPipe } from './pipes/filter-divisions.pipe';
import { FileUploadModule  } from 'ng2-file-upload';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { FixtureUploaderComponent } from './fixture-uploader/fixture-uploader.component';
import { PlayerActionsComponent } from './player-actions/player-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    SquadComponent,
    FixtureComponent,
    SquadListComponent,
    FixtureListComponent,
    PlayerListComponent,
    AddFixtureComponent,
    AddPlayerComponent,
    FilterDivisionsPipe,
    FixtureUploaderComponent,
    PlayerActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
    FileUploadModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [FixtureListComponent, AddPlayerComponent, AddFixtureComponent, PlayerActionsComponent],
  providers: [
    PlayerService, 
    SquadService, 
    FixtureService, 
    MatMomentDateModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-IE'},
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
