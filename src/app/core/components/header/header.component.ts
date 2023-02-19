import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Theme, ThemeToggler } from '@shared/services/theme.service';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showTheme = {
    light: false,
    dark: true,
  };

  isActived: boolean = false;
  isDarkTheme!: Observable<boolean>;
  toggleControl = new FormControl(false);

  @Output() changeLanguage = new EventEmitter<'es' | 'en'>();

  constructor(
    private tt: ThemeToggler,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) { }

  changeLang(lang: 'es' | 'en'): void {
    if (this.translate.currentLang == 'es') {
      this.document.body.classList.add('lang-en');
      this.document.body.classList.remove('lang-es');
    } else {
      this.document.body.classList.add('lang-es');
      this.document.body.classList.remove('lang-en');
    }
    this.changeLanguage.emit(lang);
  }
  ngAfterViewInit(): void {
    if (this.translate.currentLang == 'es') {
      this.document.body.classList.add('lang-es');
      console.log(this.translate.currentLang);
    }
  }

  switchTheme(newTheme: Theme): void {
    this.tt.switchTheme(newTheme);
  }
}
