const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  async send<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, ...fetchOptions } = options;
    
    const authToken = token || this.getAuthToken();
    
    const headers: Record<string, string> = {
      ...fetchOptions.headers as Record<string, string>,
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (fetchOptions.body && !(fetchOptions.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async getGoogleAuthUrl(): Promise<{ url: string }> {
    return this.send('/api/auth/google');
  }

  async getCurrentUser() {
    return this.send('/api/auth/me');
  }

  async logout(): Promise<{ success: boolean }> {
    return this.send('/api/auth/logout', { method: 'POST' });
  }

  // User methods
  async getUser(id: string) {
    return this.send(`/api/users/${id}`);
  }

  async updateUserAvatar(id: string, file: File): Promise<{ success: boolean; avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.send(`/api/users/${id}`, {
      method: 'PATCH',
      body: formData,
    });
  }

  // Giving methods
  async createGiving(data: {
    amount: number;
    type: string;
    date: string;
    description?: string;
  }): Promise<{ success: boolean; id: string }> {
    return this.send('/api/givings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getGivings(page = 1, perPage = 30, sort = '-date,-created'): Promise<{ items: unknown[] }> {
    const params = new URLSearchParams({
      page: page.toString(),
      perPage: perPage.toString(),
      sort,
    });
    return this.send(`/api/givings?${params}`);
  }

  async getGiving(id: string) {
    return this.send(`/api/givings/${id}`);
  }

  async deleteGiving(id: string): Promise<{ success: boolean }> {
    return this.send(`/api/givings/${id}`, { method: 'DELETE' });
  }

  // File URL helpers
  getAvatarUrl(userId: string, filename?: string): string {
    if (!filename) return '';
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }
    return `${this.baseUrl}/uploads/avatars/${userId}/${filename}`;
  }
}

export const api = new ApiClient(API_URL);
export default api;
