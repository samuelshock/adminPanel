import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-doughnut',
  templateUrl: './graphic-doughnut.component.html',
  styles: []
})
export class GraphicDoughnutComponent implements OnInit {

  @Input('name') leyend: string = 'Leyend';

  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];
  @Input() chartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
