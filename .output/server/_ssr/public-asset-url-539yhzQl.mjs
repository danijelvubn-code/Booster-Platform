function publicAssetUrl(path) {
  const normalized = path.replace(/^\/+/, "");
  return `${"/"}${normalized}`;
}
export {
  publicAssetUrl as p
};
