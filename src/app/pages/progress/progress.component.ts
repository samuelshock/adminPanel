import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1: number = 20;
  progress2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  /* actualizar(event: number) {
    console.log('Event0: ', event);
  } */

}
