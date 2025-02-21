import { request, gql } from "graphql-request";

const SHOPIFY_STORE_DOMAIN = "mansinoise.myshopify.com";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = "ab606b7469f8fdb9a810bcf7255a4a5c"; // Replace this
const API_VERSION = "2025-01";
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;

export const fetchProducts = async () => {
  const query = gql`
    query getCollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: 10) {
          edges {
            node {
              id
              title
              tags
              descriptionHtml
              handle
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    sku
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
              metafield(namespace: "product_details", key: "product_title") {
                namespace
                key
                value
                type
              }
            }
          }
        }
      }
    }
  `;

  try {
    console.log("Fetching products...");

    const headers = {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/json",
    };

    const variables = { handle: "smart-watches" };

    const response = await request(SHOPIFY_GRAPHQL_URL, query, variables, headers);
    // Extract products from response
    const products = response.collectionByHandle?.products?.edges.map(({ node }) => {
      console.log("Raw Variants Data Before Mapping:", JSON.stringify(node.variants, null, 2)); // Debug log
    
      return {
        id: node.id,
        title: node.title,
        descriptionHtml: node.descriptionHtml,
        handle: node.handle,
        featuredImage: node.featuredImage,
        priceRange: node.priceRange,
    
        // ✅ Ensure variants are correctly mapped
        variants: node.variants.edges.map(({ node: variant }) => {
          console.log("Variant Object Before Mapping:", JSON.stringify(variant, null, 2)); // Debug log
    
          return {
            id: variant.id,
            title: variant.title,
            sku: variant.sku,
            price: variant.price.amount, // Extract price amount
            currency: variant.price.currencyCode, // Extract currency
            availableForSale: variant.availableForSale,
            selectedOptions: variant.selectedOptions.reduce((acc, option) => {
              acc[option.name] = option.value;
              return acc;
            }, {}), // Convert selected options from array to object
            image: variant.image?.url || null,
          };
        }),
    
        metafield: node.metafield ? { key: node.metafield.key, value: node.metafield.value } : null,
        uspTags: node.tags.filter(tag => tag.toLowerCase().startsWith("usp")),
      };
    }) || [];
    
    
    // console.log("Fetched products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
