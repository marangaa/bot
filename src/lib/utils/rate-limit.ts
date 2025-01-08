interface RateLimitConfig {
    maxRequests: number;  // Maximum requests per window
    windowMs: number;     // Time window in milliseconds
  }
  
  interface RateLimitResult {
    success: boolean;
    remaining: number;
    reset: number;
  }
  
  class RateLimit {
    private cache: Map<string, { count: number; resetTime: number }>;
    private config: RateLimitConfig;
  
    constructor(config: RateLimitConfig) {
      this.cache = new Map();
      this.config = config;
    }
  
    async check(request: Request): Promise<RateLimitResult> {
      const ip = request.headers.get('x-forwarded-for') || 'unknown';
      const now = Date.now();
  
      // Clean up expired entries
      for (const [key, value] of this.cache.entries()) {
        if (value.resetTime < now) {
          this.cache.delete(key);
        }
      }
  
      // Get or create rate limit info for this IP
      const rateLimitInfo = this.cache.get(ip) || {
        count: 0,
        resetTime: now + this.config.windowMs,
      };
  
      // Reset if window has expired
      if (rateLimitInfo.resetTime < now) {
        rateLimitInfo.count = 0;
        rateLimitInfo.resetTime = now + this.config.windowMs;
      }
  
      // Check if rate limit is exceeded
      if (rateLimitInfo.count >= this.config.maxRequests) {
        return {
          success: false,
          remaining: 0,
          reset: Math.ceil((rateLimitInfo.resetTime - now) / 1000),
        };
      }
  
      // Increment counter and update cache
      rateLimitInfo.count++;
      this.cache.set(ip, rateLimitInfo);
  
      return {
        success: true,
        remaining: this.config.maxRequests - rateLimitInfo.count,
        reset: Math.ceil((rateLimitInfo.resetTime - now) / 1000),
      };
    }
  }
  
  // Create rate limiter instance with config
  export const rateLimit = new RateLimit({
    maxRequests: 20,  // 20 requests
    windowMs: 60000,  // per minute
  });