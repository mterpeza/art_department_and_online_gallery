const assetBaseUrl = (process.env.REACT_APP_ASSET_BASE_URL || "").replace(
  /\/+$/,
  "",
);

export function assetUrl(path) {
  if (!path) return path;
  if (/^(https?:)?\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return assetBaseUrl ? `${assetBaseUrl}${normalizedPath}` : normalizedPath;
}
