export function createCartItemKey({ productId, variantId }) {
  return `${productId}::${variantId ?? 'default'}`;
}

export function normalizeCartLine(line) {
  const quantity = Number.isFinite(Number(line.quantity)) ? Math.max(1, Number(line.quantity)) : 1;
  const unitPrice = Number.isFinite(Number(line.unitPrice)) ? Number(line.unitPrice) : 0;

  return {
    productId: line.productId,
    variantId: line.variantId ?? 'default',
    quantity,
    unitPrice,
    name: line.name ?? '',
    slug: line.slug ?? '',
    image: line.image ?? '',
    shipClass: line.shipClass ?? 'ambient',
    restrictedCountries: line.restrictedCountries ?? []
  };
}

export function mergeCartLines(lines) {
  const merged = new Map();

  for (const inputLine of lines) {
    const line = normalizeCartLine(inputLine);
    const key = createCartItemKey(line);
    const existing = merged.get(key);

    if (existing) {
      existing.quantity += line.quantity;
      continue;
    }

    merged.set(key, { ...line });
  }

  return Array.from(merged.values());
}

export function calculateCartTotals(lines) {
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);

  return {
    subtotal,
    currency: 'EUR'
  };
}

export function countCartItems(lines) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function updateCartLineQuantity(lines, itemKey, quantity) {
  const safeQuantity = Math.max(1, Number(quantity) || 1);

  return lines.map((line) =>
    createCartItemKey(line) === itemKey ? { ...line, quantity: safeQuantity } : line
  );
}

export function removeCartLine(lines, itemKey) {
  return lines.filter((line) => createCartItemKey(line) !== itemKey);
}
