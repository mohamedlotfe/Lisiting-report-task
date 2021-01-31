import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UploadService } from './upload-files/upload-files.service';
import { TablesComponent } from './tables/tables.component';
import {MatTableModule} from '@angular/material/table';


const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatTableModule
];

@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules
  ],
  // exports: [
  //   ...materialModules
  // ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
