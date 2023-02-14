import { Component } from '@angular/core';
import { RequestService } from '@shared/services/request.service';
import { CatModelAPI } from '../../../../models/cat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cat',
  templateUrl: './list-cat.component.html',
  styleUrls: ['./list-cat.component.scss']
})
export class ListCatComponent {
  catList: CatModelAPI[] = []
  isLoading: boolean = false;

  constructor(
    private requestService : RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCatList();
  }

  private getCatList(): void {
    this.isLoading = true;
    this.requestService.getCats().subscribe(
      (response: CatModelAPI[]) => {
        this.catList = response;
        this.isLoading = false;
      }, (error) => {
        console.log('Algo ha petado y estoy en el Componente');
      });
  }
  getCatDetail(id:any){
    console.log(id)
    this.router.navigateByUrl(`/breeds/${id}`)
  }

}
