export function buildApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedResource = (resource || '').trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${normalizedResource}/`
    : `http://localhost:8000/api/${normalizedResource}/`;

  return baseUrl;
}
