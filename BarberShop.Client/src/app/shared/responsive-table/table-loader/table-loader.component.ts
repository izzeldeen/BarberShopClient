import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-table-loader]',
  templateUrl: './table-loader.component.html',
  styleUrls: ['./table-loader.component.scss']
})
export class TableLoaderComponent implements OnInit {
  @Input() rows = 5;
  @Input() columns = 5;
  @Input() lineWidth = 70;
  Array = Array;
  constructor() { }

  ngOnInit(): void {
  }

}
