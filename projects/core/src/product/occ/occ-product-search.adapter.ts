import { Injectable } from '@angular/core';
import { ProductSearchAdapter } from '../connectors/search/product-search.adapter';
import { SearchConfig } from '../model/search-config';
import {
  ProductSearchPage,
  SuggestionList,
} from '../../occ/occ-models/occ.models';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { ConverterService } from '../../util/converter.service';
import {
  PRODUCT_SEARCH_NORMALIZER,
  PRODUCT_SUGGESTIONS_LIST_NORMALIZER,
} from '../connectors/search/converters';

@Injectable()
export class OccProductSearchAdapter implements ProductSearchAdapter {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadSearch(
    fullQuery: string,
    searchConfig: SearchConfig
  ): Observable<ProductSearchPage> {
    return this.http
      .get(this.getSearchEndpoint(fullQuery, searchConfig))
      .pipe(this.converter.pipeable(PRODUCT_SEARCH_NORMALIZER));
  }

  loadSuggestionList(
    term: string,
    pageSize: number
  ): Observable<SuggestionList> {
    return this.http
      .get(this.getSuggestionEndpoint(term, pageSize.toString()))
      .pipe(this.converter.pipeable(PRODUCT_SUGGESTIONS_LIST_NORMALIZER));
  }

  protected getSearchEndpoint(
    query: string,
    searchConfig: SearchConfig
  ): string {
    return this.occEndpoints.getUrl(
      'productSearch',
      {
        query,
      },
      {
        pageSize: searchConfig.pageSize,
        currentPage: searchConfig.currentPage,
        sort: searchConfig.sortCode,
      }
    );
  }

  protected getSuggestionEndpoint(term: string, max: string): string {
    return this.occEndpoints.getUrl('productSuggestions', {
      term,
      max,
    });
  }
}
