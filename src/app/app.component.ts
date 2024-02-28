import { Component } from '@angular/core';

import { ColDef, ColGroupDef, ValueGetterParams } from 'ag-grid-community'; // Column Definition Type Interface
import 'ag-grid-enterprise'
import { ISetFilterParams, KeyCreatorParams } from 'ag-grid-enterprise';
@Component({
  selector: 'app-root',
  template: `
    <!-- The AG Grid component -->
    <ag-grid-angular
      class="ag-theme-quartz"
      style="height: 500px;"
      [rowData]="rowData"
      [columnDefs]="colDefs"
    >
      
    </ag-grid-angular>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ag-grid';

  rowData = [
    {
      name: 'Tesla',
      GroupB: { age: 50},
      username: 'Y-Serires',
      city: 'Bhusawal',
      state: 'MH',
      coin: 2,
      Date: '12/12/12',
      gender: 'Male',
      sport : 'Cricket'
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
      sport : 'Football'
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
      sport : 'Table Tennis'
    },
  ];

  
  colDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Group A', field: 'name', filter: false },
    {
      headerName: 'SportName',
      editable: false,
      children: [
        { field: 'sport' },
        { field: 'GroupB.age' },
      ],
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
      valueFormatter : (params : any) => {
        return '(' + params.value + ")"
       },
   
   
      filterParams : {
        suppressMiniFilter: false,
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
        
          
      }
      
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
 onCellValueChanged = (params: { api: { onFilterChanged: () => void; }; }) => {
    // trigger filtering on cell edits

    console.log('oldg')
    params.api.onFilterChanged();
};

}

function multipliedWithPrice(params: ValueGetterParams) {

  return params.data.coin * 100;
}
