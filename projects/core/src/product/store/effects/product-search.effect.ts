import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as productsSearchActions from '../actions/product-search.action';
import { ProductImageNormalizer } from '../../occ/converters/product-image-normalizer';
import { ProductSearchConnector } from '../../connectors/search/product-search.connector';

@Injectable()
export class ProductsSearchEffects {
  @Effect()
  searchProducts$: Observable<
    | productsSearchActions.SearchProductsSuccess
    | productsSearchActions.SearchProductsFail
  > = this.actions$.pipe(
    ofType(productsSearchActions.SEARCH_PRODUCTS),
    switchMap((action: productsSearchActions.SearchProducts) => {
      return this.productSearchConnector
        .search(action.payload.queryText, action.payload.searchConfig)
        .pipe(
          map(data => {
            this.productImageConverter.convertList(data.products);
            return new productsSearchActions.SearchProductsSuccess(
              data,
              action.auxiliary
            );
          }),
          catchError(error =>
            of(
              new productsSearchActions.SearchProductsFail(
                error,
                action.auxiliary
              )
            )
          )
        );
    })
  );

  @Effect()
  getProductSuggestions$: Observable<
    | productsSearchActions.GetProductSuggestionsSuccess
    | productsSearchActions.GetProductSuggestionsFail
  > = this.actions$.pipe(
    ofType(productsSearchActions.GET_PRODUCT_SUGGESTIONS),
    map(
      (action: productsSearchActions.GetProductSuggestions) => action.payload
    ),
    switchMap(payload => {
      return this.productSearchConnector
        .getSuggestions(payload.term, payload.searchConfig.pageSize)
        .pipe(
          map(data => {
            if (data.suggestions === undefined) {
              return new productsSearchActions.GetProductSuggestionsSuccess([]);
            }
            return new productsSearchActions.GetProductSuggestionsSuccess(
              data.suggestions
            );
          }),
          catchError(error =>
            of(new productsSearchActions.GetProductSuggestionsFail(error))
          )
        );
    })
  );

  constructor(
    private actions$: Actions,
    private productSearchConnector: ProductSearchConnector,
    private productImageConverter: ProductImageNormalizer
  ) {}
}
