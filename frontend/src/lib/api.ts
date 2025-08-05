const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Request failed');
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Authentication APIs
export const authApi = {
  register: async (username: string, password: string) => {
    return fetchApi<{ access_token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  login: async (username: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    return fetchApi<{ access_token: string }>('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
  },
};

// Community APIs
export const communityApi = {
  createPost: async (title: string, content: string) => {
    return fetchApi('/community/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
  },

  getPosts: async (skip = 0, limit = 20) => {
    return fetchApi(`/community/posts?skip=${skip}&limit=${limit}`);
  },

  getPost: async (postId: number) => {
    return fetchApi(`/community/posts/${postId}`);
  },

  createReply: async (postId: number, content: string) => {
    return fetchApi('/community/replies', {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, content }),
    });
  },
}; 