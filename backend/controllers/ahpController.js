const {
  calculateWeights,
  consistencyRatio,
  finalScores
} = require("../utils/ahpAlgorithm");

exports.computeAHP = (req, res) => {
  const { matrix, scores, alternatives } = req.body;

  const weights = calculateWeights(matrix);
  const { CI, CR } = consistencyRatio(matrix, weights);

  if (CR > 0.1) {
    return res.json({
      success: false,
      message: "Matrix is inconsistent",
      CI,
      CR
    });
  }

  const scoresResult = finalScores(weights, scores);

  const ranking = alternatives.map((name, i) => ({
    name,
    score: scoresResult[i]
  })).sort((a, b) => b.score - a.score);

  res.json({
    success: true,
    weights,
    CI,
    CR,
    ranking,
    best: ranking[0]
  });
};