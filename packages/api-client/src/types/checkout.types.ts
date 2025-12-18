export interface ShippingMethod {
  id: number;
  name: string;
  deliveryTime: string; // e.g., "۲ تا ۴ روز کاری"
  price: number;
}

export interface FinalizeCheckoutPayload {
  shipmentMethodId: number;
  userLocationId: number;
}