import { Component, OnInit } from '@angular/core';

// Importa dependências
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Atributos
  public apiURL = 'http://localhost:3000/';
  public data: Array<any> = [];
  public sort = 'title';
  public order = 'asc';

  constructor(

    // Injeta dependências
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {

    // Obtém valores das variáveis da URL (rota)
    this.sort = this.activatedRoute.snapshot.paramMap.get('sort');
    this.order = this.activatedRoute.snapshot.paramMap.get('order');

    // Obtem todos os documentos da API
    this.http.get(
      this.apiURL 
      + `games?_expand=medias&_expand=platforms&_expand=types&_sort=${this.sort}&_order=${this.order}`)
      .subscribe(
        (res: any) => {

          // Prepara dados para a view (HTML)
          this.data = res;
        }
      );
  }

  // Seleciona o campo de ordenação e a ordem (asc, desc)
  reOrder(order: string) {
    this.router.navigate([`/home/${this.sort}/${order}`]);
  }

}
