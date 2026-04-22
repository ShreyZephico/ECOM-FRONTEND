// ==============================
// CONFIG
// ==============================

const STORE_API_BASE_URL = import.meta?.env?.VITE_STORE_API_BASE_URL ?? "/api";

const PUBLISHABLE_API_KEY = import.meta?.env?.VITE_STORE_PUBLISHABLE_API_KEY;

if (!PUBLISHABLE_API_KEY) {
  // Fail fast so deployments don't silently call the wrong backend/key.
  throw new Error(
    "Missing VITE_STORE_PUBLISHABLE_API_KEY. Set it in your deployment environment or a local .env file."
  );
}


// ==============================
// GENERIC REQUEST HANDLER
// ==============================

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

  let data;

  try {
    data = await response.json();
  } catch (err) {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    console.error("API ERROR:", data);
    throw new Error(`Store API failed: ${response.status}`);
  }

  return data;
};

// ==============================
// HOME PAGE (PRODUCTS)
// ==============================

export const fetchStoreProducts = async () => {
  const data = await requestStore("/store/products");
  return data?.products || [];
};

export const fetchStoreProduct = async (productId) => {
  const data = await requestStore(`/store/products/${productId}`);
  return data?.product || null;
};


// ==============================
// FETCH ALL COMBINATIONS
// ==============================

export const fetchCombinations = async () => {
  const data = await requestStore("/store/combination");
  return data?.product_variants || [];
};

export const fetchCombinationsByProductId = async (productId) => {
  const variants = await fetchCombinations();
  return variants.filter((v) => v?.product_id === productId);
};

// ==============================
// PLACE RING ORDER
// ==============================

export const placeRingOrder = async (orderRequest) => {
  if (!orderRequest || typeof orderRequest !== "object") {
    throw new Error("Invalid order request");
  }

  const data = await requestStore("/store/ring-order", {
    method: "POST",
    body: orderRequest,
  });

  return data;
};


// ==============================
// FETCH UNIQUE PRODUCTS
// ==============================

export const fetchProducts = async () => {
  const variants = await fetchCombinations();

  const productMap = new Map();

  variants.forEach((variant) => {
    const product = variant?.product;

    if (product && !productMap.has(product.id)) {
      productMap.set(product.id, product);
    }
  });

  return Array.from(productMap.values());
};


// ==============================
// FETCH SINGLE PRODUCT + VARIANTS
// ==============================

export const fetchProductWithVariants = async (productId) => {
  const variants = await fetchCombinations();

  const filteredVariants = variants.filter(
    (v) => v?.product_id === productId
  );

  if (!filteredVariants.length) return null;

  return {
    product: filteredVariants[0]?.product,
    variants: filteredVariants,
  };
};


// ==============================
// GET AVAILABLE OPTIONS
// ==============================

export const getProductOptions = (variants = []) => {
  const sizes = new Map();
  const metals = new Map();
  const diamonds = new Map();

  variants.forEach((v) => {
    if (v?.size) sizes.set(v.size.id, v.size);
    if (v?.metals) metals.set(v.metals.id, v.metals);
    if (v?.diamonds) diamonds.set(v.diamonds.id, v.diamonds);
  });

  return {
    sizes: Array.from(sizes.values()),
    metals: Array.from(metals.values()),
    diamonds: Array.from(diamonds.values()),
  };
};


// ==============================
// FIND MATCHING VARIANT
// ==============================

export const findVariant = ({
  variants = [],
  size_id,
  metal_id,
  diamond_id,
} = {}) => {
  return variants.find(
    (v) =>
      v?.size_id === size_id &&
      v?.metal_id === metal_id &&
      v?.diamond_id === diamond_id
  );
};


// ==============================
// CUSTOMIZE RING
// ==============================

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