import { Injectable, Inject, Renderer2, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({
  providedIn: 'root'
})
// export class ThemeService {
//   private _darkTheme = new Subject<boolean>();
//   private renderer!: Renderer2;
//   isDarkTheme = this._darkTheme.asObservable();

//   constructor(@Inject(DOCUMENT) private document: Document) {}

//   setDarkTheme(isDarkTheme: boolean): void {
//     this._darkTheme.next(isDarkTheme);
//     debugger
//   }
//   ngAfterViewInit() {
//     if (this.isDarkTheme === true) {
//       console.log('Enable Dark Mode')
//       this.renderer.addClass(document.body, 'dark-mode');
//     } else {
//       console.log('Disable Dark Mode')
//       this.renderer.removeClass(document.body, 'dark-mode');
//     }
//   }
// }
export class ThemeToggler {
  currentTheme: Theme = 'light-theme';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.document.body.classList.add(this.currentTheme);
  }

  switchTheme(newTheme: Theme): void {
    this.document.body.classList.replace(this.currentTheme, newTheme)
    this.currentTheme = newTheme;
  }
}
