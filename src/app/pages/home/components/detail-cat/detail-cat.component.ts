import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '@shared/services/request.service';
import { CatModelAPI } from 'src/app/models/cat.model';

@Component({
  selector: 'app-detail-cat',
  templateUrl: './detail-cat.component.html',
  styleUrls: ['./detail-cat.component.scss']
})
export class DetailCatComponent {
  public catDetail!: CatModelAPI;
  public isLoading: boolean = false;
  constructor(
    private activatedRouter: ActivatedRoute,
    private requestService : RequestService,
  ) {


  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      params => {
        this.getCat(params['id']);
      }
    )
  }

  getCat(id:any): void {
    this.isLoading = true;
    this.requestService.getCatId(id).subscribe(
      (response: CatModelAPI) => {
        this.catDetail = response;
        this.isLoading = false;
      }, (error) => {
        console.log('Algo ha petado y estoy en el Componente');
      }
    )
  }
}
