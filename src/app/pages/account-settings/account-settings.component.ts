import { Component, OnInit, Input, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _adjustments: SettingsService ) { }

  ngOnInit() {
    this.putCheck();
  }

  changeColor( theme: string, link: any) {
    this.applyCheck(link);
    this._adjustments.applyThemeLocal(theme);
  }

  applyCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');

    for (let ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  putCheck() {
    const selectors: any = document.getElementsByClassName('selector');

    let theme = this._adjustments.adjustment.theme;

    for (let ref of selectors) {
      if (ref.getAttribute('data-theme-usr') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
