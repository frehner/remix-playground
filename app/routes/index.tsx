import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Image } from "@shopify/hydrogen-react";
import type {
  ProductConnection as ProductConnectionType,
  Shop as ShopType,
} from "@shopify/hydrogen-react/storefront-api-types";
import { gql } from "graphql-request";
import { storefrontClient } from "../shopify-client";

const query = gql`
  {
    shop {
      name
    }
    products(first: 1) {
      nodes {
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

export function meta() {
  return {
    title: "Remix: Hydrogen",
  };
}

export const loader: LoaderFunction = async () => {
  // console.log(storefrontClient.getPublicTokenHeaders());
  const req = await fetch(storefrontClient.getStorefrontApiUrl(), {
    method: "POST",
    body: query,
    headers: {
      ...storefrontClient.getPublicTokenHeaders({ contentType: "graphql" }),
      // "content-type": "application/json",
    },
  });

  const reqJson = await req.json();
  // console.log(reqJson);

  return json(reqJson);
};

export default function Index() {
  const data = useLoaderData<{
    data: { shop: ShopType; products: ProductConnectionType };
  }>();

  const image = data.data.products.nodes[0].variants.nodes[0].image;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      {image && <Image data={image} width={500} widths={[500]} />}
    </div>
  );
}
