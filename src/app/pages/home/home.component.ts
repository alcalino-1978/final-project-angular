import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getListItems();
  }

  private getListItems(): void {
    // llamada asincrona a la API
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
