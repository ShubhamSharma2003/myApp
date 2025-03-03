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


export const fetchProducts = async (handle) => {
  const query = `
    query getCollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: 100) {
          edges {
            node {
              id
              title
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
                key
                value
              }
              media(first: 100) {
                nodes {
                  previewImage {
                    altText
                    url
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `;

  try {
    console.log(`Fetching products for handle from collection: ${handle}`);

    const variables = { handle };
    const response = await shopifyFetch({ query, variables });

    // Extract product data from response
    const products = response?.data?.collectionByHandle?.products?.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      descriptionHtml: node.descriptionHtml,
      handle: node.handle,
      featuredImage: node.featuredImage,
      priceRange: node.priceRange,
      variants: node.variants.edges.map(({ node: variant }) => ({
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
      })),
      media: node.media?.nodes.map(media => ({
        url: media.previewImage?.url || null,
        altText: media.previewImage?.altText || null,
      })) || [],
      metafield: node.metafield ? { key: node.metafield.key, value: node.metafield.value } : null,
      uspTags: node.tags.filter(tag => tag.toLowerCase().startsWith("usp")),
      filterTags: node.tags.filter(tag =>
        ["bestsellers-gadgets", "female health monitor"].includes(tag.toLowerCase())
      ),
    })) || [];

    const collectionData = {
      title:  response?.data?.collectionByHandle?.title || "",
      products: products,
    };

    return collectionData;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
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
  // console.log(variantId, "Variantttt")
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
    const response = await fetch('https://mansinoise.myshopify.com/api/2025-01/graphql.json', {
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

export const searchProducts = async (query) => {
  const gqlQuery = `
    query {
      products(query: "${query}", first: 50) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            tags
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
              metafield(namespace: "product_details", key: "product_title") {
          key
          value
        }
          compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query: gqlQuery });

    return response?.data?.products?.edges.map(({ node }) => ({
      id: node?.id,
      title: node?.title,
      handle: node?.handle,
      tags: node?.tags,
      description: node?.descriptionHtml,
      image: node?.featuredImage?.url || null,
      price: node?.priceRange?.minVariantPrice?.amount,
      maxPrice: node?.compareAtPriceRange?.maxVariantPrice?.amount,
      currency: node?.priceRange?.minVariantPrice?.currencyCode,
      metafield: node?.metafield ? { key: node?.metafield?.key, value: node?.metafield?.value } : null,
    })) || [];
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
    return [];
  }
};

export const fetchProductByHandle = async (handle) => {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
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
          key
          value
        }
        media(first: 100) {
          nodes {
            previewImage {
              altText
              url
            }
          }
        }
        tags
      }
    }
  `;

  try {
    console.log(`Fetching product for handle: ${handle}`);
    
    const variables = { handle };
    const response = await shopifyFetch({ query, variables });

    // Extract product data from response
    const product = response?.data?.productByHandle;

    if (!product) return null;

    return {
      id: product?.id,
      title: product?.title,
      descriptionHtml: product?.descriptionHtml,
      handle: product?.handle,
      featuredImage: product?.featuredImage,
      priceRange: product?.priceRange,
      variants: product?.variants?.edges.map(({ node: variant }) => ({
        id: variant?.id,
        title: variant?.title,
        sku: variant?.sku,
        price: variant?.price?.amount,
        compareAtPrice: variant?.compareAtPrice?.amount || null,
        currency: variant.price?.currencyCode,
        availableForSale: variant?.availableForSale,
        selectedOptions: variant?.selectedOptions.reduce((acc, option) => {
          acc[option.name] = option.value;
          return acc;
        }, {}),
        image: variant?.image?.url || null,
      })),
      media: product?.media?.nodes.map(media => ({
        url: media?.previewImage?.url || null,
        altText: media?.previewImage?.altText || null,
      })) || [],
      metafield: product?.metafield ? { key: product?.metafield?.key, value: product?.metafield?.value } : null,
      uspTags: product?.tags.filter(tag => tag.toLowerCase().startsWith("usp")),
      filterTags: product?.tags.filter(tag =>
        ["bestsellers-gadgets", "female health monitor"].includes(tag.toLowerCase())
      ),
    };
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return null;
  }
};




