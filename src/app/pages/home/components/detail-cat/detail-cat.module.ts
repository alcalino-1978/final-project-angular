import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailCatRoutingModule } from './detail-cat-routing.module';
import { DetailCatComponent } from './detail-cat.component';


@NgModule({
  declarations: [
    DetailCatComponent
  ],
  imports: [
    CommonModule,
    DetailCatRoutingModule
  ]
})
export class DetailCatModule {}
