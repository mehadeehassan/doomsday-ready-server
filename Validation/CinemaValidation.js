function validateCinema(cinemaData) {
  const { name, bundleSizes } = cinemaData;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return 'Cinema name is required';
  }

  if (!Array.isArray(bundleSizes)) {
    return 'Bundle sizes must be an array';
  }

  if (bundleSizes.length < 1 || bundleSizes.length > 10) {
    return 'Cinema must have 1 to 10 bundle sizes';
  }

  if (new Set(bundleSizes).size !== bundleSizes.length) {
    return 'Duplicate bundle sizes are not allowed';
  }

  for (const size of bundleSizes) {
    if (!Number.isInteger(size) || size < 1 || size > 500) {
      return 'Each bundle size must be between 1 and 500';
    }
  }

  return null;
}

module.exports = { validateCinema };