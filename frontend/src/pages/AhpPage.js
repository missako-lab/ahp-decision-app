import React, { useState } from "react";
import { computeAHP } from "../services/api";

export default function AhpPage() {
  const [criteria, setCriteria] = useState(["C1", "C2", "C3"]);
  const [alternatives, setAlternatives] = useState(["A", "B", "C"]);

  const [matrix, setMatrix] = useState([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]);

  const [scores, setScores] = useState([
    [5, 5, 5],
    [5, 5, 5],
    [5, 5, 5],
  ]);

  const [result, setResult] = useState(null);

  const addCriterion = () => {
    const newCriteria = [...criteria, `C${criteria.length + 1}`];
    setCriteria(newCriteria);

    setMatrix([
      ...matrix.map(row => [...row, 1]),
      Array(newCriteria.length).fill(1),
    ]);

    setScores(scores.map(row => [...row, 5]));
  };

  const addAlternative = () => {
    const newAlternatives = [...alternatives, `Alt${alternatives.length + 1}`];
    setAlternatives(newAlternatives);
    setScores([...scores, Array(criteria.length).fill(5)]);
  };

  const updateMatrix = (i, j, value) => {
    const newMatrix = [...matrix];
    newMatrix[i][j] = parseFloat(value);
    newMatrix[j][i] = 1 / value;
    setMatrix(newMatrix);
  };

  const updateScore = (i, j, value) => {
    const newScores = [...scores];
    newScores[i][j] = parseFloat(value);
    setScores(newScores);
  };

  const handleCompute = async () => {
    const res = await computeAHP({ matrix, scores, alternatives });
    setResult(res);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">

      {/* TITLE */}
      <h1 className="text-5xl font-extrabold text-white mb-8 animate-pulse tracking-wide">
        🚀 AHP Decision Tool
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={addCriterion}
          className="bg-green-500 hover:bg-green-600 active:scale-95 transition transform text-white px-5 py-2 rounded-xl shadow-lg"
        >
          + Criterion
        </button>

        <button
          onClick={addAlternative}
          className="bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition transform text-white px-5 py-2 rounded-xl shadow-lg"
        >
          + Alternative
        </button>
      </div>

      {/* MATRIX CARD */}
      <div className="bg-white/90 backdrop-blur p-5 rounded-2xl shadow-xl mb-6 hover:shadow-2xl transition">
        <h2 className="font-bold text-lg mb-3">Pairwise Matrix</h2>
        <table>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((val, j) => (
                  <td key={j}>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => updateMatrix(i, j, e.target.value)}
                      className="border p-2 w-20 m-1 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SCORES CARD */}
      <div className="bg-white/90 backdrop-blur p-5 rounded-2xl shadow-xl mb-6 hover:shadow-2xl transition">
        <h2 className="font-bold text-lg mb-3">Scores</h2>
        <table>
          <tbody>
            {scores.map((row, i) => (
              <tr key={i}>
                {row.map((val, j) => (
                  <td key={j}>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => updateScore(i, j, e.target.value)}
                      className="border p-2 w-20 m-1 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMPUTE BUTTON */}
      <button
        onClick={handleCompute}
        className="bg-blue-700 hover:bg-blue-800 active:scale-95 transition transform text-white px-8 py-3 rounded-2xl shadow-lg text-lg"
      >
        Compute
      </button>

      {/* RESULT */}
      {result && (
        <div className="bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xl mt-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-3">Results</h2>

          <p className="mb-2">CR: {result.CR.toFixed(4)}</p>

          {result.CR < 0.1 ? (
            <p className="text-green-600 font-bold">Consistent ✅</p>
          ) : (
            <p className="text-red-600 font-bold">Inconsistent ❌</p>
          )}

          <h3 className="mt-4 font-bold">Ranking</h3>
          <ul className="mt-2 space-y-1">
            {result.ranking.map((r, i) => (
              <li key={i} className="hover:translate-x-1 transition">
                {r.name} → {r.score.toFixed(3)}
              </li>
            ))}
          </ul>

          <h2 className="mt-4 text-blue-600 font-bold text-xl">
            Best: {result.best.name}
          </h2>
        </div>
      )}
    </div>
  );
}