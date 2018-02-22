import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('name') leyend: string = 'Leyend';
  @Input('value') progress: number = 50;

  @Output() changeValuesE: EventEmitter<number> = new EventEmitter();

  changeValue( val: number ) {
    if (this.progress + val > 100 || this.progress + val < 0) {
      return;
    }
    this.progress += val;

    this.changeValuesE.emit(this.progress);
    // Note: luego de cambiar el valor cambia el foco al viewchild
    this.txtProgress.nativeElement.focus();
  }

  constructor() {
  }

  ngOnInit() {
  }

  onChanges( newValue: number) {

    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.txtProgress.nativeElement.value = this.progress;

    this.changeValuesE.emit(this.progress);
  }

}
