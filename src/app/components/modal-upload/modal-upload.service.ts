import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public type: string;
  public id: string;

  public hided: string = 'hided';

  public notification = new EventEmitter<any>();

  constructor() { }

   hideModal() {
     this.id = null;
     this.type = null;
     this.hided = 'hided';
   }

   displayModal( type: string, id: string) {
    this.id = null;
    this.type = null;
    this.hided = '';
    this.id = id;
    this.type = type;
   }

}
