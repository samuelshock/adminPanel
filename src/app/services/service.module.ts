import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  HospitalService,
  MedicoService,
  AdminGuard,
  VerifyTokenGuard
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    VerifyTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
