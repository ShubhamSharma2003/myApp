import { request, gql } from "graphql-request";
const SHOPIFY_STORE_DOMAIN = "mansinoise.myshopify.com";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = "ab606b7469f8fdb9a810bcf7255a4a5c"; 
const API_VERSION = "2025-01";
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`;
import AsyncStorage from '@react-native-async-storage/async-storage';


const shopifyFetch = async ({ query, variables = {} }) => {
  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("❌ Shopify GraphQL Error:", data.errors);
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (error) {
    console.error("❌ Shopify API Fetch Error:", error);
    return null;
  }
};

export { shopifyFetch };


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
              variants(first: 20) {
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
                    compareAtPrice {
                      amount
                      currencyCode
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
               media(first: 100) {
            nodes {
              previewImage {
                altText
                url
              }
            }
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
    
      return {
        id: node.id,
        title: node.title,
        descriptionHtml: node.descriptionHtml,
        handle: node.handle,
        featuredImage: node.featuredImage,
        priceRange: node.priceRange,
    

        variants: node.variants.edges.map(({ node: variant }) => {
          return {
            id: variant.id,
            title: variant.title,
            sku: variant.sku,
            price: variant.price.amount, 
            compareAtPrice: variant.compareAtPrice?.amount || null,
            currency: variant.price.currencyCode, 
            availableForSale: variant.availableForSale,
            selectedOptions: variant.selectedOptions.reduce((acc, option) => {
              acc[option.name] = option.value;
              return acc;
            }, {}), 
            image: variant.image?.url || null,
          };
        }),
        media: node.media?.nodes.map(media => ({
          url: media.previewImage?.url || null,
          altText: media.previewImage?.altText || null,
        })) || [],
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


export const createCart = async () => {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  return response.data?.cartCreate?.cart || null;
};


export const addToCart = async (variantId, quantity = 1) => {
  console.log(variantId, "Variantttt")
  let cartId = await getCartId();

  if (!cartId) {
    const cart = await createCart();
    if (cart) {
      cartId = cart.id;
      await setCartId(cart.id);
    }
  }

  const query = `
    mutation {
      cartLinesAdd(
        cartId: "${cartId}",
        lines: [{ quantity: ${quantity}, merchandiseId: "${variantId}" }]
      ) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  console.log("Resonsesssss", response)
  return response.data?.cartLinesAdd?.cart || null;
};


export const getCart = async () => {
  const cartId = await AsyncStorage.getItem('cartId');  // Get stored cartId
  if (!cartId) return null;

  const query = `
    query {
  cart(id: "${cartId}") {
    id
    checkoutUrl
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
              }
                image {
                url
              }
              product {
                title
                featuredImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}

  `;

  const response = await shopifyFetch({ query });

  if (!response || !response.data?.cart) {
    console.error("❌ Failed to fetch cart. Resetting cart ID...");
    await AsyncStorage.removeItem('cartId');  // Reset cart ID if fetch fails
    return null;
  }

  return response.data.cart;
};

const getCartId = async () => {
  try {
    const cartId = await AsyncStorage.getItem('cartId');
    return cartId;
  } catch (error) {
    console.error('❌ Error fetching cart ID from AsyncStorage:', error);
    return null;
  }
};

export const removeFromCart = async (cartId, lineId) => {
  try {
    const response = await fetch('https://mansinoise.myshopify.com/api/2024-01/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart {
                id
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                          title
                          price {
                            amount
                            currencyCode
                          }
                          product {
                            title
                          }
                        }
                      }
                    }
                  }
                }
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          cartId: cartId,
          lineIds: [lineId],
        },
      }),
    });

    const jsonResponse = await response.json();
    console.log("Remove Item Response:", JSON.stringify(jsonResponse, null, 2));

    if (jsonResponse.errors) {
      console.error("Shopify API Error:", jsonResponse.errors);
      throw new Error("Failed to remove item from cart.");
    }

    return jsonResponse.data?.cartLinesRemove?.cart || null;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};



