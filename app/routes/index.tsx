import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Image } from "@shopify/hydrogen-ui-alpha";
import type {
  Image as ImageType,
  Shop as ShopType,
} from "@shopify/hydrogen-ui-alpha/storefront-api-types";

export const loader: LoaderFunction = async () => {
  const req = await fetch(
    `https://hydrogen-preview.myshopify.com/api/2022-07/graphql.json`,
    {
      method: "POST",
      body: `query ShopName { shop { name } }`,
      headers: {
        "X-Shopify-Storefront-Access-Token": "3b580e70970c4528da70c98e097c2fa0",
        "content-type": "application/graphql",
      },
    }
  );

  const reqJson = await req.json();
  // console.log(reqJson);

  return json(reqJson);
};

export default function Index() {
  const data = useLoaderData<{ data: { shop: ShopType } }>();
  console.log(data.data.shop.name);
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
      Image:
      {/* <Image data={data} /> */}
    </div>
  );
}
