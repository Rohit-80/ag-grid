import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, IServerSideDatasource, IServerSideGetRowsRequest, IsRowSelectable, RowModelType} from 'ag-grid-enterprise';
// import {
  
//   GridReadyEvent,
//   IServerSideDatasource,
//   IServerSideGetRowsRequest,
//   ModuleRegistry,
//   RowModelType,
// } from 'ag-grid-community/core';

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'app-sever-side-rendering',
  template : `

       <ag-grid-angular
    style="width: 100%; height:60vh;"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowModelType]="rowModelType"
    [pagination]="true"
    [paginationPageSize]="pageSize"
    [class]="themeClass"
    [serverSideDatasource]="serverSideDatasource"
    [rowSelection]="'single'"
    [isRowSelectable]="isRowSelectable"
    (selectionChanged)="onSelectionChanged()"
     
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>


   `
  ,
  styleUrls: ['./sever-side-rendering.component.css']
})
export class SeverSideRenderingComponent  {
  
  
   pagination : boolean = true;
   pageSize : number = 50;
  isRowSelectable  = (p : any)=> {
     
    return p.data.year >= 2000;
  }
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 220 ,  sortable : true , filter: 'agTextColumnFilter',},
    { field: 'country', minWidth: 200 , checkboxSelection : true},
    { field: 'year' },
    { field: 'sport', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    
  };
  public rowModelType: RowModelType = 'serverSide';
  public rowData! : any;
  serverSideDatasource ! : any;
  public themeClass: string =
    "ag-theme-quartz-dark";

  constructor(private http: HttpClient) {}
   GridApi! : GridApi;
  onGridReady(params: any) {
     this.GridApi=  params.api;
    this.http
      .get<IOlympicData[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
      .subscribe((data) => {
       
        // setup the fake server with entire dataset
        const fakeServer = createFakeServer(data);
        // create datasource with a reference to the fake server
        const datasource = createServerSideDatasource(fakeServer);
        // register the datasource with the grid
       
        // params.api.setGridOption('serverSideDatasource', datasource);
      
        this.serverSideDatasource = datasource;
      });
  }

  onSelectionChanged(){
        console.log(this.GridApi.getSelectedRows())
  }

  }
  



  function createServerSideDatasource(server: any): IServerSideDatasource {
    return {
      getRows: (params) => {
        
        const response = server.getData(params.request);
        console.log(params.request)
        
     
        setTimeout(() => {
          if (response.success) {
    
            params.success({ rowData: response.rows });
          } else {
            params.fail();
          }
        }, 500);
      },
    };
  }
  function createFakeServer(allData: any[]) {
    return {
      getData: (request: IServerSideGetRowsRequest) => {
        const requestedRows = allData.slice(request.startRow, request.endRow);
        return {
          success: true,
          rows: requestedRows,
        };
      },
    };
  }