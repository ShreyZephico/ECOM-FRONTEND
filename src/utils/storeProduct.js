export const getProductTitle = (product) =>
  product?.title || product?.name || "Untitled product";

export const getProductImage = (product) =>
  product?.thumbnail || product?.image || product?.images?.[0]?.url || "";

export const getProductImages = (product) => {
  const images = product?.images?.map((image) => image.url).filter(Boolean) || [];
  const thumbnail = getProductImage(product);

  return images.length > 0 ? images : thumbnail ? [thumbnail] : [];
};

export const getCleanDescription = (description) =>
  (description || "")
    .replace(/Status:\s*Published/gi, "")
    .replace(/\s+/g, " ")
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
  const variantWithPrice = product?.variants?.find(
    (variant) => getVariantPrice(variant) !== null,
  );

  return variantWithPrice ? getVariantPrice(variantWithPrice) : null;
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
