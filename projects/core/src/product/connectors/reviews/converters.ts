import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Review } from '../../../occ/occ-models/occ.models';

export const PRODUCT_REVIEWS_NORMALIZER = new InjectionToken<
  Converter<any, Review[]>
>('ProductReviewsListNormalizer');

export const PRODUCT_REVIEW_SERIALIZER = new InjectionToken<
  Converter<Review, any>
>('ProductReviewsAddSerializer');
