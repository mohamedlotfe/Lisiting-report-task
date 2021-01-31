import { Component, Input, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})

export class TablesComponent implements OnInit {
  displayedColumns1: string[] = ['type', 'count'];
  displayedColumns2: string[] = ['make', 'percent'];
  displayedColumns3: string[] = ['price'];
  displayedColumns4: string[] = ['id', 'make', 'price', 'mileage', 'amount'];
  @Input() avgPrices_arr = [];
  @Input() distribution_arr = [];
  @Input() avgPriceContacted = [];
  @Input() topContacted = [];


  constructor() { }

  ngOnInit(): void {

  }

}
