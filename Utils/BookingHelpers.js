function calculateBooking(bundleSizes, groupSize) {
  const dp = Array(groupSize + 1).fill(Infinity);
  const previousBundle = Array(groupSize + 1).fill(null);

  dp[0] = 0;

  for (let seats = 1; seats <= groupSize; seats++) {
    for (const bundle of bundleSizes) {
      if (seats >= bundle && dp[seats - bundle] + 1 < dp[seats]) {
        dp[seats] = dp[seats - bundle] + 1;
        previousBundle[seats] = bundle;
      }
    }
  }

  if (dp[groupSize] === Infinity) {
    return null;
  }

  const bundles = {};

  let remainingSeats = groupSize;

  while (remainingSeats > 0) {
    const bundle = previousBundle[remainingSeats];

    bundles[bundle] = (bundles[bundle] || 0) + 1;
    remainingSeats -= bundle;
  }

  return {
    groupSize,
    totalBundles: dp[groupSize],
    bundles
  };
}

module.exports = { calculateBooking };