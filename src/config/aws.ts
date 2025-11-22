// AWS Configuration
// These should be set as environment variables in your EC2 instance

export const AWS_CONFIG = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  
  // API Gateway endpoints
  apiEndpoint: import.meta.env.VITE_AWS_API_ENDPOINT || 'https://api.yourdomain.com',
  
  // Cognito
  cognitoUserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
  cognitoClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
  
  // S3
  s3Bucket: import.meta.env.VITE_S3_BUCKET || '',
  s3Region: import.meta.env.VITE_S3_REGION || 'us-east-1',
  
  // CloudFront
  cdnDomain: import.meta.env.VITE_CLOUDFRONT_DOMAIN || '',
};

// API client for AWS API Gateway
export class AWSApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = AWS_CONFIG.apiEndpoint;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Projects API
  async createProject(data: { name: string; type: string; description?: string }) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProjects() {
    return this.request('/projects', { method: 'GET' });
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`, { method: 'GET' });
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  // Export API
  async generateExport(projectId: string, format: 'zip' | 'github' | 'android-apk' | 'ios-ipa') {
    return this.request(`/projects/${projectId}/export`, {
      method: 'POST',
      body: JSON.stringify({ format }),
    });
  }

  // QR Code API
  async generateQRCode(projectId: string) {
    return this.request(`/projects/${projectId}/qr-code`, {
      method: 'POST',
    });
  }
}

export const apiClient = new AWSApiClient();
