import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Schrödinger's Cat";
  lang = 'es';
  isDarkTheme!: Observable<boolean>;
  constructor(
    private translateService: TranslateService,
    ) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
  }

  setLang(lang: 'es' | 'en'): void {
    this.lang = lang;
    this.translateService.use(lang);
  }
}
