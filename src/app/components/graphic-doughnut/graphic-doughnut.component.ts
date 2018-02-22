import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphic-doughnut',
  templateUrl: './graphic-doughnut.component.html',
  styles: []
})
export class GraphicDoughnutComponent implements OnInit {

  @Input('name') leyend: string = 'Leyend';

  @Input('labels') public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') public doughnutChartData: number[] = [350, 450, 100];
  @Input('chartType') public doughnutChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
