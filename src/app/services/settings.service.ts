import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  adjustment: Adjustment = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _documment) {
    this.loadAdjustment();
  }

  saveAdjustment() {
    localStorage.setItem('user_adjustment', JSON.stringify(this.adjustment));
  }

  loadAdjustment() {
    if (localStorage.getItem('user_adjustment')) {
      this.adjustment = JSON.parse(localStorage.getItem('user_adjustment'));
      this.applyThemeLocal(this.adjustment.theme);
      console.log('Cargado del localStorage');
    } else {
      console.log('Usando valores por defecto');
      this.applyThemeLocal(this.adjustment.theme);
    }
  }

  applyThemeLocal( theme: string) {
    const url = `assets/css/colors/${ theme }.css`;
    this._documment.getElementById('tema').setAttribute('href', url);

    this.adjustment.theme = theme;
    this.adjustment.themeUrl = url;

    this.saveAdjustment();
  }

}

interface Adjustment {
  themeUrl: string;
  theme: string;
}
