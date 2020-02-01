import { Component, OnInit, Input } from '@angular/core';
import { WaziHttpService } from '../wazi-http.service';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  inputsArray: Object[] = []; // filtering inputs
  displayData: Object[] = []; 
  tableData: any = []; 
  dataBackup: Object[] = []; // used for filtering the table
  headers: Object[] = []; // consist headers names came from the server and display names 
  toggleSort: boolean = false; // boolean flag for sort direction

  constructor(private waziHttpService: WaziHttpService) { }
  
  ngOnInit() {
    this.waziHttpService.getData().subscribe(result => {
      this.tableData = result;
      this.dataBackup = this.tableData;

      // get headers from server data
      var headersArray = Object.keys(this.tableData[0])

      // create array of headers which will be passed to table component( contains name and displayName)
      headersArray.forEach(element => {
        this.headers.push({ "name": element, "displayName": element.charAt(0).toUpperCase() + element.slice(1) })
      });
      // display data
      for (let i = 0; i < this.tableData.length; i++) {
        this.displayData.push(this.dataBackup[i])
      }

      // add blank inputs for filtering according to number of headers
      for (let i = 0; i < this.headers.length; i++) {
        this.inputsArray.push({ value: '' })
      }
    })
  }

  sort(header: string) {
    // check type of requests items to sort 
    let sortingType = typeof (this.tableData[0][header['name']]);

    switch (sortingType) {
      case 'string':
        // make all names lower case 
        this.tableData.forEach(element => {
          element[header['name']] = element[header['name']].toLowerCase();
        });

        this.tableData.sort((a: Object, b: Object) => {
          if (b[header['name']] > a[header['name']]) { return 1 }
          if (b[header['name']] < a[header['name']]) { return -1 }
          else { return 0 }
        });
        break;

      case 'number':
        this.tableData.sort((a, b) => { return a[header['name']] - b[header['name']] });
        break;
    }

    if (!this.toggleSort) {
      this.tableData.reverse();
    }
    // toggle directions
    this.toggleSort= !this.toggleSort;
    this.displayData = this.tableData
  }

  filter(filterInputs: any) {
    // fetch all the data before every filter
    this.tableData = this.dataBackup;
    // empty displaydata 
    this.displayData = [];

    // filter the table according to all inputs
    for (let i = 0; i < filterInputs.length; i++) {
      this.tableData = this.tableData.filter(row => row[this.headers[i]['name']].toString().
        toLowerCase().indexOf(filterInputs[i].value.toLowerCase()) >= 0);
    }
    // assign displayData 
    this.displayData = this.tableData;
  }
}