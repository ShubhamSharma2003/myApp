import shopifyClient from "./shopifyApi";


export const fetchProducts = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            handle
            tags
            metafields(first: 100) {
            edges {
                node {
                namespace
                key
                value
                jsonValue
                    }
                }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            priceRange {
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
    const response = await shopifyClient.request(query);
    return response.data.products.edges.map(({ node }) => node);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
