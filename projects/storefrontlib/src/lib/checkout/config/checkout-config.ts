export abstract class CheckoutConfig {
  checkout?: {
    steps: Array<string>;
    shippingAddress?: string;
  };
}
