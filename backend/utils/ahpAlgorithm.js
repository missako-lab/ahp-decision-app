function normalizeMatrix(matrix) {
  const columnSums = matrix[0].map((_, colIndex) =>
    matrix.reduce((sum, row) => sum + row[colIndex], 0)
  );

  return matrix.map(row =>
    row.map((val, j) => val / columnSums[j])
  );
}

function calculateWeights(matrix) {
  const normalized = normalizeMatrix(matrix);
  return normalized.map(row =>
    row.reduce((a, b) => a + b, 0) / row.length
  );
}

function consistencyRatio(matrix, weights) {
  const n = matrix.length;

  const weightedSum = matrix.map(row =>
    row.reduce((sum, val, j) => sum + val * weights[j], 0)
  );

  const lambdaMax =
    weightedSum.reduce((sum, val, i) => sum + val / weights[i], 0) / n;

  const CI = (lambdaMax - n) / (n - 1);

  const RI = [0, 0, 0.58, 0.9, 1.12, 1.24][n] || 1.24;

  const CR = CI / RI;

  return { CI, CR };
}

function finalScores(weights, scores) {
  return scores.map(alt =>
    alt.reduce((sum, val, i) => sum + val * weights[i], 0)
  );
}

module.exports = {
  calculateWeights,
  consistencyRatio,
  finalScores
};