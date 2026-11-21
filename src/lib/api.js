const BACKEND_URL = 'http://31.97.69.178:8082';
const API_BASE = '/api';

class ApiService {
  async request(path, options = {}) {
    const url = `${API_BASE}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `HTTP ${res.status}`);
    }
    return res.status === 204 ? null : res.json();
  }

  resolveFileUrl(url) {
    if (!url) return null;
    if (url.startsWith('http://localhost:8080')) {
      return url.replace('http://localhost:8080', BACKEND_URL);
    }
    if (url.startsWith('/uploads/')) {
      return `${BACKEND_URL}${url}`;
    }
    return url;
  }

  getProperties(params = {}) {
    const q = new URLSearchParams(params).toString();
    return this.request(`/properties${q ? '?' + q : ''}`);
  }

  getFeaturedProperties() {
    return this.request('/properties/featured');
  }

  getProperty(id) {
    return this.request(`/properties/${id}`);
  }
}

const api = new ApiService();
export default api;
export { BACKEND_URL as API_BASE };