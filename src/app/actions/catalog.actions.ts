import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Device } from '../model/device';
import { Config } from '../config';

/**
 * Classe action per funzionalità di catalogo
 */
@Injectable()
export class CatalogActions {

  returnUrl: string;

  constructor( private ngRedux: NgRedux<IAppState>, private http: Http, private router: Router, private route: ActivatedRoute) { }

  /**
   * Carica il catalogo dei dati
   */
  loadCatalog() {

    const user = JSON.parse(localStorage.getItem('user'));
    const myHeaders = new Headers();
    myHeaders.append('userId', user.id);
    myHeaders.append('companyId', Config.COMPANY_ID);
    myHeaders.append('password', user.password);

    const options = new RequestOptions({ headers: myHeaders });
    this.http.get(
      `${Config.API_HOST}/${Config.API_SERVICE}/${Config.API_CATALOG}`,
      options
    ).subscribe(
      (data) => {
        const catalogResponse = data.json();
        const catalog = catalogResponse.data;
        localStorage.setItem('catalog', JSON.stringify(catalog));
        this.ngRedux.dispatch({
          type: 'LOAD_CATALOG',
          payload: { catalog }
        });
      },
      (err) => {

      }
    );
  }

  /**
   * Toggle di selezione su un nodo di catalogo
   *
   * @param node - nodo di catalogo
   * @param selected - indica se il nodo è stato selezionato o deselzionato
   */
  selectLeaf(node, selected) {
    this.ngRedux.dispatch({
      type: selected ? 'REMOVE_SELECT_NODE' : 'ADD_SELECT_NODE',
      payload: { node }
    });
  }
}
