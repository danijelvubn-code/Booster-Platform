function formatTokens(n) {
  return n.toLocaleString();
}
function formatCompactTokens(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toLocaleString();
}
export {
  formatTokens as a,
  formatCompactTokens as f
};
