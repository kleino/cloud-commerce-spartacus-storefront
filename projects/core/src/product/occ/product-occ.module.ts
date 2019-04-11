import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { defaultOccProductConfig } from '../config/product-config';
import { ConfigModule } from '../../config/index';
import { ProductReviewsAdapter } from '../connectors/reviews/product-reviews.adapter';
import { OccProductReviewsAdapter } from './occ-product-reviews.adapter';
import { PRODUCT_REVIEWS_LIST_NORMALIZER } from '../connectors/reviews/converters';
import { OccProductReviewsListNormalizer } from './converters/occ-product-reviews-list-normalizer';
import { OccProductAdapter } from './occ-product.adapter';
import { ProductAdapter } from '../connectors/product/product.adapter';
import { PRODUCT_NORMALIZER } from '../connectors/product/converters';
import { ProductImageNormalizer } from './converters/product-image-normalizer';
import { ProductReferenceNormalizer } from './converters/product-reference-normalizer';
import { ProductSearchAdapter } from '../connectors/search/product-search.adapter';
import { OccProductSearchAdapter } from './occ-product-search.adapter';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    OccModule,
    ConfigModule.withConfig(defaultOccProductConfig),
  ],
  providers: [
    {
      provide: ProductAdapter,
      useClass: OccProductAdapter,
    },
    {
      provide: PRODUCT_NORMALIZER,
      useExisting: ProductImageNormalizer,
      multi: true,
    },
    {
      provide: PRODUCT_NORMALIZER,
      useClass: ProductReferenceNormalizer,
      multi: true,
    },
    {
      provide: ProductSearchAdapter,
      useClass: OccProductSearchAdapter,
    },
    {
      provide: ProductReviewsAdapter,
      useClass: OccProductReviewsAdapter,
    },
    {
      provide: PRODUCT_REVIEWS_LIST_NORMALIZER,
      useClass: OccProductReviewsListNormalizer,
      multi: true,
    },
  ],
})
export class ProductOccModule {}
