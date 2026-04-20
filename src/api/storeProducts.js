const STORE_API_BASE_URL =
  import.meta.env.VITE_STORE_API_BASE_URL || "http://localhost:9000";

const PUBLISHABLE_API_KEY =
  import.meta.env.VITE_STORE_PUBLISHABLE_API_KEY ||
  "pk_343b075589624994508f2d0e9c3d9b41cf4d52b679042177ecccb68a2ee48deb";

// 🔥 YOUR REGION (IMPORTANT)
const REGION_ID = "reg_01KPKCM1TJ9KGBAJ4F0S3ND26E";

// 🔥 UNIVERSAL REQUEST
const requestStore = async (path, options = {}) => {
  const response = await fetch(`${STORE_API_BASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_API_KEY,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("API ERROR:", data);
    throw new Error(`Store API failed: ${response.status}`);
  }

  return data;
};

// 🔥 FETCH ALL PRODUCTS (WITH REGION)
export const fetchStoreProducts = async () => {
  const data = await requestStore(
    `/store/products?region_id=${REGION_ID}`
  );

  return data.products || [];
};

// 🔥 FETCH SINGLE PRODUCT (WITH REGION)
export const fetchStoreProduct = async (productId) => {
  const data = await requestStore(
    `/store/products/${productId}?region_id=${REGION_ID}`
  );

  return data.product || null;
};

// 🔥 CUSTOMIZE RING API
export const customizeRing = async ({
  variant_id,
  size,
  diamond_quality,
}) => {
  return requestStore("/store/custom", {
    method: "POST",
    body: {
      variant_id,
      size,
      diamond_quality,
    },
  });
};