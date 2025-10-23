import axios from 'axios';

export function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const api = axios.create({
  baseURL: 'https://api.borrowfy.site/api',
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
// 	const token = getCookie("csrftoken");
// 	if (token) {
// 		config.headers["X-CSRFToken"] = token;
// 	}
// 	return config;
// });

export default api;
