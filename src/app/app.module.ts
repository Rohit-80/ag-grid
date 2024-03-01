import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  AgGridModule } from 'ag-grid-angular';
// import { MasterDetailModule } from 'ag-grid-enterprise';
import { LicenseManager ,} from 'ag-grid-enterprise'
// import { SimpleCellRenderer } from './simple-cell-renderer.component';
import 'ag-grid-enterprise';
import { SeverSideRenderingComponent } from './sever-side-rendering/sever-side-rendering.component';
import { HttpClientModule } from '@angular/common/http';
// LicenseManager.setLicenseKey("your license key")
// import "ag-grid-enterprise";

@NgModule({
  declarations: [
    AppComponent,
    SeverSideRenderingComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    
    
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
