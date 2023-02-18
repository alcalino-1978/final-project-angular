import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Theme, ThemeToggler } from '@shared/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showTheme = {
    light : false,
    dark : true,
  }

  isDarkTheme!: Observable<boolean>;
  toggleControl = new FormControl(false);

  @Output() changeLanguage = new EventEmitter<'es' | 'en'>();

  constructor(
    private tt: ThemeToggler
    ) { }
  changeLang(lang: 'es' | 'en'): void {
    this.changeLanguage.emit(lang);
  }
  ngOnInit(): void {
  }

  switchTheme(newTheme: Theme): void {
    this.tt.switchTheme(newTheme);
  }
}

