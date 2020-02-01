import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() entity: any;
  @Input() rowNumber: number;
  @Input() headers: Object[];

  selected: boolean = false;
  row: string[] = [];
  color: string;

  constructor() { }

  ngOnInit() {
    if (!this.entity) {
      return;
    }
    // build rows
    this.headers.forEach(header => {
      this.row.push(this.entity[header['name']])
    })
  }
}