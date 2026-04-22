export const getProductTitle = (product) =>
  product?.title  || "Untitled product";

export const getProductImage = (product) =>
    product?.thumbnail || product?.images?.[0]?.url || "";

export const getProductImages = (product) => {
  const images = product?.images?.map((image) => image.url).filter(Boolean) || [];
  const thumbnail = getProductImage(product);

  return images.length > 0 ? images : thumbnail ? [thumbnail] : [];
};

export const getCleanDescription = (description) =>
  (description || "")
    .replace(/Status:\s*Published/gi, "")
    .trim();

export const getVariantPrice = (variant) => {
  const price =
    variant?.calculated_price?.calculated_amount ??
    variant?.calculated_price?.original_amount ??
    variant?.prices?.[0]?.amount ??
    variant?.price;

  return Number.isFinite(Number(price)) ? Number(price) : null;
};

export const getProductPrice = (product) => {
  const homePrice = Number(product?.combination_min_price);
  if (Number.isFinite(homePrice) && homePrice > 0) {
    return homePrice;
  }

  const variantWithPrice = product?.variants?.find(
    (variant) => getVariantPrice(variant) !== null,
  );

  const price = variantWithPrice ? getVariantPrice(variantWithPrice) : null;
  return Number.isFinite(Number(price)) && Number(price) > 0 ? Number(price) : null;
};

export const formatPrice = (amount) => {
  if (!Number.isFinite(Number(amount))) {
    return null;
  }

  return `Rs. ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(amount))}`;
};

export const getMaterialOptions = (product) => {
  const materialOption = product?.options?.find(
    (option) => option.title?.toLowerCase() === "material",
  );

  const values =
    materialOption?.values?.map((value) => value.value).filter(Boolean) || [];

  if (values.length > 0) {
    return values;
  }

  return product?.variants?.map((variant) => variant.title).filter(Boolean) || [];
};

export const getVariantByMaterial = (product, material) =>
  product?.variants?.find((variant) =>
    variant.options?.some((option) => option.value === material),
  ) || product?.variants?.find((variant) => variant.title === material);
