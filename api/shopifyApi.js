const SHOPIFY_STORE_URL = "https://mansinoise.myshopify.com";
const ACCESS_TOKEN = "ab606b7469f8fdb9a810bcf7255a4a5c";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: `
          query {
            products(first: 5) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.products.edges.map(edge => edge.node); // Extract products
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};
