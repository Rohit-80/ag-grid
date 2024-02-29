import { Component } from '@angular/core';

import { ColDef, ColGroupDef, ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-enterprise';
import {
  GridApi,
  IDetailCellRendererParams,
  ISelectCellEditorParams,
  ISetFilterParams,
  ITextCellEditorParams,
  KeyCreatorParams,
} from 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="addItem()">Add</button>
    <button (click)="updateItem()">Update</button>
    <button (click)="removeSelectedItems()">Remove</button>

    <!-- The AG Grid component -->

    <ag-grid-angular
      class="ag-theme-quartz"
      style="height: 500px;"
      [rowData]="rowDatas"
      [columnDefs]="columnDefss"
      [defaultColDef]="defaultColDef"
   
      [pagination]="true"
      [detailCellRendererParams]="detailCellRendererParams"
      [rowSelection]="'multiple'"
      [tooltipInteraction]="tooltipInteraction"
      groupUseEntireRow="{true}"
      [groupSelectsChildren]="true"
      [autoGroupColumnDef]="autoCellRendering"
      (gridReady)="onGridReady($event)"
      [enableBrowserTooltips]="true"
      [masterDetail]="true"
      
      [undoRedoCellEditing]="undoRedoCellEditing"
      [undoRedoCellEditingLimit]="undoRedoCellEditingLimit"
    >
    </ag-grid-angular>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ag-grid';

  private gridApi!: GridApi<any>;

  undoRedoCellEditing = true;
  undoRedoCellEditingLimit = 20;
  tooltipInteraction = true;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  columnDefss: ColDef[] | ColGroupDef[] = [
    {
      headerName: 'Countries',
    //   getQuickFilterText: params => {
    //     return params.value.name;
    //  },
      field: 'country',
        filter: 'agSetColumnFilter',
     
      filterParams : {
        applyMiniFilterWhileTyping : true
      },
      cellEditor: 'agTextCellEditor',
      checkboxSelection: true,
    
      floatingFilter: false,
      cellEditorParams: {
        maxLength: 20,
      },
      tooltipField: 'country',
      // cellRenderer: 'agGroupCellRenderer',
      // rowGroup: true,
      cellRendererParams: {
        suppressCount: false,
        checkbox: false,
        suppressHeaderMenuButton : true,
        //  innerRenderer: SimpleCellRenderer,
        suppressDoubleClickExpand: true,
        suppressEnterExpand: true,
      },
    },
    {
      field: 'name',
      editable: true,
      cellEditor: 'agTextCellEditor',
      cellRenderer: 'agGroupCellRenderer',
    },
    {
      editable: true,
      field: 'age',
      enableCellChangeFlash: true,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorParams: {
        values: [12, 14, 16],
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        // valueListMaxHeight: 220
      },
    },
    {
      editable: true,
      field: 'noNumber',
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 0,
        max: 100,
      },
    },
  ];
  rowDatas = [
    {
      country: 'Ireland',
      name: 'Sean',
      age: 30,
      callRecords: [{ callId: 1, number: '123456789', switchCode: 1 }],
    },
    {
      country: 'Ireland',
      name: 'Orla',
      age: 25,
      callRecords: [{ callId: 2, number: '123456789', switchCode: 1 }],
    },
    {
      country: 'France',
      name: 'Jean',
      age: 40,
      callRecords: [{ callId: 1, number: '123456789', switchCode: 1 }],
    },
    {
      country: 'France',
      name: 'Marie',
      age: 35,
      callRecords: [{ callId: 1, number: '123456789', switchCode: 1 }],
    },
    {
      country: 'USA',
      name: 'John',
      age: 28,
      callRecords: [{ callId: 1, number: '123456789', switchCode: 1 }],
    },
    {
      country: 'USA',
      name: 'Sarah',
      age: 32,
      noNumber: 12,
      callRecords: [{ callId: 1, number: '123456789', switchCode: 1 }],
    },
  ];

  rowData = [
    {
      name: 'Tesla',
      GroupB: { age: 50 },
      username: 'Y-Serires',
      city: 'Bhusawal',
      state: 'MH',
      coin: 2,
      Date: '12/12/12',
      gender: 'Male',
      sport: 'Cricket',
    },
    {
      name: 'Ford',
      username: 'F-Series',
      city: 'Guru Gram',
      GroupB: { age: 45 },
      state: 'HR',
      coin: 10,
      Date: '12/12/52',
      gender: 'Female',
      sport: 'Football',
    },
    {
      name: 'Toyota',
      username: 'Corolla',
      city: 'Cuttak',
      GroupB: { age: 48 },
      state: 'WB',
      coin: 5,
      Date: '13/12/22',
      gender: 'Male',
      sport: 'Table Tennis',
    },
  ];

  okClick() {
    console.log(this.gridApi.getRowNode('0'));
    // this.gridApi.forEachLeafNode(data=>console.log(data))
  }

  addItem() {
    const res = this.gridApi.applyTransaction({
      add: [{ name: 'new name', country: 'new country', age: 32 }],
      // addIndex: 0,
    })!;
    console.log(res);
  }

  updateItem() {
    // update the first 2 items
    const itemsToUpdate: any[] = [];
    this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      // only do first 2
      if (index >= 2) {
        return;
      }
      const data = rowNode.data;
      data.age = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    const res = this.gridApi.applyTransaction({ update: itemsToUpdate })!;
    console.log(res);

    // const rowNode : any = this.gridApi.getRowNode('0');
    // rowNode.setSelected(true);
    // rowNode.setData({name : 'abc',age : 12 , country : 'westIndies'});
    // rowNode.setDataValue('name','setDataValue changed the value');
  }

  removeSelectedItems() {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.applyTransaction({ remove: selectedData })!;
    console.log(res);
  }


  public gridOptions2 = {
    detailGridOptions: {
      rowSelection: 'multiple',
      enableRangeSelection: true,
      pagination: true,
      paginationAutoPageSize: true,
         
         
      columnDefs: [
        { field: 'callId', checkboxSelection: true  , cellRenderer : 'agGroupCellRenderer' } ,
        { field: 'number', minWidth: 150 },
        { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams<any, any>;
  
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: true,
  };
 
  public themeClass: string =
    "ag-theme-quartz-dark";

  public detailCellRendererParams: any = {

    detailGridOptions: {
      rowSelection: 'multiple',
      masterDetail: true,
      enableRangeSelection: true,
      pagination: true,
      paginationAutoPageSize: true,
         detailCellRendererParams : this.gridOptions2 ,
         
      columnDefs: [
        { field: 'callId', checkboxSelection: true  , },
        { field: 'number', minWidth: 150 ,cellRenderer : 'agGroupCellRenderer'},
        { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams<any, any>;



 

  colDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Group A', field: 'name', filter: false },
    {
      // showRowGroup : 'agGroupCellRenderer',
      headerName: 'SportName',
      editable: false,
      children: [{ field: 'sport' }, { field: 'GroupB.age' }],
      resizable: false,
    },
    {
      field: 'city',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'reset'],
      },
    },
    { field: 'state', pinned: 'left', sortable: true },

    {
      field: 'coin',
      filter: 'agNumberColumnFilter',
      filterValueGetter: (params: any) => {
        console.log('work', params);
        return (params.data.coin.value += '03');
      },

      filterParams: {
        defaultOption: 'lessThan',
        filterOptions: ['lessThan', 'equal'],
        filterPlaceholder: 'Yo Filter',

        maxNumConditions: 3,
        numAlwaysVisibleConditions: 2,
      },
    },

    {
      field: 'Date',
      filter: 'agDateColumnFilter',
      filterParams: {
        browserDatePicker: true,
        inRangeFloatingFilterDateFormat: 'YY-M-DD',
      },
    },

    {
      field: 'gender',
      tooltipField: 'gender',
      filter: 'agSetColumnFilter',
      valueFormatter: (params: any) => {
        console.log(getData());
        return '(' + params.value + ')';
      },
      //  tooltipField : 'gender',

      filterParams: {
        // suppressMiniFilter: false,
        //   treeList: true,
        //   treeListFormatter: (pathKey: any, level: number, parentPathKeys: any) => {
        //     console.log(pathKey,level,parentPathKeys);
        //     if (level === 0 && pathKey) {
        //         return `Year ${pathKey}`;
        //     }
        //     return pathKey;
        // }
        // keyCreator: (params: KeyCreatorParams) =>
        // params.value ? params.value.join('#') : null,
        // excelMode : true,
        // suppressSelectAll : true,
        // showTooltips : true,
        // treeList : true,
        // valueFormatter : (params : any) => {
        //    return '(' + params.value + ")"
        // },
        // cellRenderer: (params : any) =>{
        //   return params.value + 'c'
        // },
        //  values: (params:any) => {
        //   let cnt = 'a';
        //   // async update simulated using setTimeout()
        //   setTimeout(() => {
        //       // fetch values from server
        //       const valuesw = cnt;
        //       // supply values to the set filter
        //       params.success(['value1','value2']);
        //   }, 1000)
        // }
        // defaultToNothingSelected: true,
      },
    },
    {
      field: 'value',
      valueGetter: multipliedWithPrice,
    },
    { field: 'country', filter: 'agSetColumnFilter' },
  ];

  columnTypes = [
    {
      editable: true,
    },
  ];
  onCellValueChanged = (params: { api: { onFilterChanged: () => void } }) => {
    // trigger filtering on cell edits

    console.log('cell Filter Changed');
    params.api.onFilterChanged();
  };

  autoCellRendering = {
    cellRendererSelector: (params: any) => {
      if (['USA', 'Ireland'].includes(params?.node?.key)) {
        return; // use Default Cell Renderer
      }
      return { component: 'agGroupCellRenderer' };
    },
  };
}

function multipliedWithPrice(params: ValueGetterParams) {
  return params.data.coin * 100;
}

export function getData(): any[] {
  const rowData: any[] = [];

  const irelandCities = ['Dublin', 'Galway', 'Cork'];
  const ukCities = ['London', 'Bristol', 'Manchester', 'Liverpool'];
  const usaCities = ['New York', 'Boston', 'L.A.', 'San Fransisco', 'Detroit'];
  const middleEarthCities = ['The Shire', 'Rohan', 'Rivendell', 'Mordor'];
  const midkemiaCities = ['Darkmoor', 'Crydee', 'Elvandar', 'LaMut', 'Ylith'];

  const addCity = function (country: string, type: string, city: string) {
    rowData.push({ country: country, type: type, city: city });
  };

  irelandCities.forEach(addCity.bind(null, 'Ireland', 'Non Fiction'));
  ukCities.forEach(addCity.bind(null, 'United Kingdom', 'Non Fiction'));
  usaCities.forEach(addCity.bind(null, 'USA Cities', 'Non Fiction'));
  middleEarthCities.forEach(addCity.bind(null, 'Middle Earth', 'Fiction'));
  midkemiaCities.forEach(addCity.bind(null, 'Midkemia', 'Fiction'));

  return rowData;
}
