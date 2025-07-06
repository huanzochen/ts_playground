/**
 * Pure JS array version of LU decomposition solver (lusolve)
 * Only supports dense n x n arrays and 1D/2D JS arrays as vectors.
 * No mathjs dependencies.
 */

function lusolve(
  A: number[][],
  b: number[] | number[][]
): number[] | number[][] {
  const n = A.length;
  // shape check
  if (Array.isArray(b[0])) {
    // 2D: must be n x 1
    if (
      !Array.isArray(b) ||
      b.length !== n ||
      (b as number[][]).some((row) => !Array.isArray(row) || row.length !== 1)
    ) {
      throw new Error(
        "Dimension mismatch. Matrix columns must match vector length."
      );
    }
  } else {
    // 1D: must be length n
    if ((b as number[]).length !== n) {
      throw new Error(
        "Dimension mismatch. Matrix columns must match vector length."
      );
    }
  }
  const { L, U, p } = lup(A);
  const bp = applyPermutation(b, p);
  const y = lsolve(L, bp);
  const x = usolve(U, y);
  return x;
}

function lup(A: number[][]): { L: number[][]; U: number[][]; p: number[] } {
  // LU decomposition with partial pivoting
  const n = A.length;
  // Deep copy of A
  const LU = A.map((row) => row.slice());
  const p = Array.from({ length: n }, (_, i) => i);

  for (let k = 0; k < n; k++) {
    // Find pivot
    let max = Math.abs(LU[k][k]);
    let k_ = k;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(LU[i][k]) > max) {
        max = Math.abs(LU[i][k]);
        k_ = i;
      }
    }
    if (max === 0) throw new Error("Matrix is singular");

    // Swap rows in LU and p
    if (k_ !== k) {
      [LU[k], LU[k_]] = [LU[k_], LU[k]];
      [p[k], p[k_]] = [p[k_], p[k]];
    }

    // Elimination
    for (let i = k + 1; i < n; i++) {
      LU[i][k] /= LU[k][k];
      for (let j = k + 1; j < n; j++) {
        LU[i][j] -= LU[i][k] * LU[k][j];
      }
    }
  }

  // Extract L and U
  const L = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i > j ? LU[i][j] : i === j ? 1 : 0))
  );
  const U = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i <= j ? LU[i][j] : 0))
  );

  return { L, U, p };
}

function applyPermutation(
  b: number[] | number[][],
  p: number[]
): number[] | number[][] {
  // b can be 1D or 2D array (column vector)
  if (Array.isArray(b[0])) {
    // 2D
    return p.map((i) => (b as number[][])[i].slice());
  } else {
    // 1D
    return p.map((i) => (b as number[])[i]);
  }
}

function lsolve(
  L: number[][],
  b: number[] | number[][]
): number[] | number[][] {
  // Forward substitution: L * y = b
  const n = L.length;
  const m = Array.isArray(b[0]) ? (b as number[][])[0].length : 1;
  const y: number[] | number[][] =
    m > 1
      ? Array.from({ length: n }, () => Array(m).fill(0))
      : Array(n).fill(0);

  for (let k = 0; k < m; k++) {
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * (m > 1 ? (y as number[][])[j][k] : (y as number[])[j]);
      }
      const bval = m > 1 ? (b as number[][])[i][k] : (b as number[])[i];
      if (m > 1) {
        (y as number[][])[i][k] = bval - sum;
      } else {
        (y as number[])[i] = bval - sum;
      }
    }
  }
  return y;
}

function usolve(
  U: number[][],
  y: number[] | number[][]
): number[] | number[][] {
  // Backward substitution: U * x = y
  const n = U.length;
  const m = Array.isArray(y[0]) ? (y[0] as number[]).length : 1;
  const x: number[] | number[][] =
    m > 1
      ? Array.from({ length: n }, () => Array(m).fill(0))
      : Array(n).fill(0);

  for (let k = 0; k < m; k++) {
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += U[i][j] * (m > 1 ? (x[j] as number[]) : (x as number[]))[j];
      }
      const yval = m > 1 ? (y[i] as number[])[k] : (y as number[])[i];
      if (U[i][i] === 0) throw new Error("Matrix is singular");
      if (m > 1) {
        (x[i] as number[])[k] = (yval - sum) / U[i][i];
      } else {
        (x as number[])[i] = (yval - sum) / U[i][i];
      }
    }
  }
  return x;
}
export { lusolve };

//// Export for Node.js or browser
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//   module.exports = { lusolve, lup, lsolve, usolve, applyPermutation };
// }
