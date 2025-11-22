# AWS Setup Checklist

This document outlines the steps needed to fully deploy your app to AWS infrastructure.

## ✅ Completed

- [x] AWS Cognito integration for authentication
- [x] TypeScript types for PostgreSQL database schema
- [x] React hooks for Projects and Build History
- [x] AWS API client configuration
- [x] Frontend authentication flow with email verification
- [x] Forgot password functionality

## 🔧 AWS Configuration Required

### 1. AWS Cognito Setup

**Status:** Code ready, requires AWS configuration

**Steps:**
1. Create a Cognito User Pool in AWS Console
2. Configure User Pool settings:
   - Email as username
   - Email verification required
   - Password requirements (min 8 characters)
3. Create an App Client (no client secret)
4. Add environment variables:
   ```bash
   VITE_COGNITO_USER_POOL_ID=your-pool-id
   VITE_COGNITO_CLIENT_ID=your-client-id
   VITE_AWS_REGION=us-east-1
   ```

**Documentation:** See `AWS_DEPLOYMENT_GUIDE.md` lines 36-46

---

### 2. PostgreSQL Database (RDS Aurora)

**Status:** Types defined, requires database setup

**Required Tables:**
```sql
-- User Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Roles (Security Critical)
CREATE TYPE app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  thumbnail_url TEXT,
  preview_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_edited TIMESTAMPTZ DEFAULT NOW()
);

-- Build History
CREATE TABLE build_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  download_url TEXT,
  size VARCHAR(50),
  credits_used INTEGER DEFAULT 5,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);
```

**Steps:**
1. Create RDS Aurora PostgreSQL instance
2. Configure VPC and security groups
3. Run migration scripts
4. Set up Row Level Security (RLS) policies
5. Add database connection string to Lambda environment

**Documentation:** See `AWS_DEPLOYMENT_GUIDE.md` lines 90-130

---

### 3. API Gateway + Lambda Functions

**Status:** Client configured, requires backend implementation

**Required Endpoints:**

#### Projects API
- `POST /projects` - Create project
- `GET /projects` - List user's projects
- `GET /projects/{id}` - Get project details
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project

#### Export API
- `POST /projects/{id}/export` - Generate export (ZIP/GitHub/APK/IPA)
- `POST /projects/{id}/qr-code` - Generate QR code

#### Build History API
- `GET /builds` - List user's build history
- `GET /builds/{id}` - Get build details

**Steps:**
1. Create Lambda functions (Node.js 18+)
2. Set up API Gateway with OpenAPI spec
3. Configure JWT authorizer using Cognito
4. Add environment variables to Lambda:
   ```
   DATABASE_URL=postgresql://...
   COGNITO_USER_POOL_ID=...
   S3_BUCKET=...
   ```
5. Update frontend environment variables:
   ```bash
   VITE_AWS_API_ENDPOINT=https://your-api-gateway-url
   ```

**Documentation:** See `AWS_DEPLOYMENT_GUIDE.md` lines 177-243

---

### 4. S3 Storage + CloudFront

**Status:** Not yet implemented

**Required:**
1. S3 bucket for project exports and files
2. CloudFront distribution for CDN
3. Proper CORS configuration
4. Lifecycle policies for temporary files

**Environment Variables:**
```bash
VITE_S3_BUCKET=your-bucket-name
VITE_S3_REGION=us-east-1
VITE_CLOUDFRONT_DOMAIN=your-cloudfront-domain
```

**Documentation:** See `AWS_DEPLOYMENT_GUIDE.md` lines 131-151

---

### 5. Frontend Deployment

**Status:** Ready for deployment

**Steps:**
1. Build frontend:
   ```bash
   npm run build
   ```
2. Sync to S3:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```
3. Invalidate CloudFront cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

**Documentation:** See `AWS_DEPLOYMENT_GUIDE.md` lines 244-273

---

## 🔐 Security Checklist

- [ ] VPC configured with private subnets for RDS
- [ ] Security groups restrict database access to Lambda only
- [ ] Cognito MFA enabled for admin accounts
- [ ] API Gateway rate limiting configured
- [ ] Lambda functions have minimal IAM permissions
- [ ] RLS policies implemented on all tables
- [ ] HTTPS enforced on CloudFront
- [ ] Secrets stored in AWS Secrets Manager

**Documentation:** See `AWS_DEPLOYMENT_GUIDE.md` lines 317-349

---

## 📊 Monitoring Setup

**Required:**
- [ ] CloudWatch Logs enabled for all Lambda functions
- [ ] CloudWatch Alarms for error rates
- [ ] X-Ray tracing enabled
- [ ] Cost alerts configured

**Documentation:** See `AWS_DEPLOYMENT_GUIDE.md` lines 350-365

---

## 💰 Estimated Monthly Costs

**Development:** ~$50-100/month
**Production:** ~$200-500/month (varies with usage)

See `AWS_DEPLOYMENT_GUIDE.md` lines 72-89 for detailed breakdown.

---

## 🚀 Deployment Order

1. **Phase 1:** Set up Cognito and test authentication locally
2. **Phase 2:** Create RDS database and run migrations
3. **Phase 3:** Deploy Lambda functions and API Gateway
4. **Phase 4:** Set up S3 and CloudFront
5. **Phase 5:** Deploy frontend and test end-to-end

---

## 📚 Additional Resources

- AWS Cognito Docs: https://docs.aws.amazon.com/cognito/
- RDS Aurora Docs: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/
- API Gateway Docs: https://docs.aws.amazon.com/apigateway/
- Lambda Docs: https://docs.aws.amazon.com/lambda/

---

## ⚠️ Important Notes

1. **Cognito Email Verification:** Users MUST verify their email before they can sign in
2. **Database Security:** Always use Row Level Security (RLS) policies
3. **User Roles:** NEVER store roles in localStorage or client-side
4. **API Authentication:** All API calls must include JWT token in Authorization header
5. **Cost Management:** Enable billing alerts and monitor usage

---

## 🔄 Current Status

The frontend is **100% AWS-ready** with:
- ✅ AWS Cognito authentication integration
- ✅ API client configured for AWS API Gateway
- ✅ Database types matching PostgreSQL schema
- ✅ React Query hooks for data fetching
- ✅ Proper error handling and validation

**Next Step:** Configure AWS services using the checklist above.
