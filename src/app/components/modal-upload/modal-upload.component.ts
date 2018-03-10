import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageUpload: File;
  tempImage: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  uploadImage() {
    this._uploadFileService.uploadFile(this.imageUpload, this._modalUploadService.type, this._modalUploadService.id)
    .then( res => {
      this._modalUploadService.notification.emit( res );
      this.closeModal();
    })
    .catch( err => {
      console.log('error al cargar la imagen....');
    });
  }

  closeModal() {
    this.imageUpload = null;
    this.tempImage = null;

    this._modalUploadService.hideModal();
  }

  onchangeImage( file: File ) {
    if (!file) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      this.tempImage = null;
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imageUpload = file;

    let reader = new FileReader();
    let urtTempImage = reader.readAsDataURL(file);

    reader.onloadend = () => this.tempImage = reader.result;
  }
}
