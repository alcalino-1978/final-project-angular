import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailCatRoutingModule } from './detail-cat-routing.module';
import { DetailCatComponent } from './detail-cat.component';
import { RatingComponent } from './rating/rating.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DetailCatComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    DetailCatRoutingModule
  ]
})
export class DetailCatModule {}
