import { createStorefrontClient } from "@shopify/hydrogen-react";

export const storefrontClient = createStorefrontClient({
  publicStorefrontToken: "3b580e70970c4528da70c98e097c2fa0",
  storeDomain: "hydrogen-preview",
  storefrontApiVersion: "2022-07",
});
