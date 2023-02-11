import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'final-ark';
  lang = 'es';

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
  }

  setLang(lang: 'es' | 'en'): void {
    this.lang = lang;
    this.translateService.use(lang);
  }
}
