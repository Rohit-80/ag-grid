import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  AgGridModule } from 'ag-grid-angular';
import { LicenseManager } from 'ag-grid-enterprise'
import 'ag-grid-enterprise';
// LicenseManager.setLicenseKey("your license key")
// import "ag-grid-enterprise";

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
