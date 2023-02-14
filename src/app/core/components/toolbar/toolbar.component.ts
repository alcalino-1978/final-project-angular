import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() changeLanguage = new EventEmitter<'es' | 'en'>();

  changeLang(lang: 'es' | 'en'): void {
    this.changeLanguage.emit(lang);
  }
}
