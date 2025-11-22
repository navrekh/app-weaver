# AWS Deployment Guide for Mobile App Builder Platform

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     AWS Cloud Architecture                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌────────────────┐                │
│  │  CloudFront  │────────▶│   S3 Bucket    │                │
│  │     (CDN)    │         │  (Static App)  │                │
│  └──────────────┘         └────────────────┘                │
│         │                                                     │
│         ▼                                                     │
│  ┌──────────────┐         ┌────────────────┐                │
│  │ API Gateway  │────────▶│  Lambda Funcs  │                │
│  │  (REST API)  │         │   (Node.js)    │                │
│  └──────────────┘         └────────────────┘                │
│         │                          │                          │
│         ▼                          ▼                          │
│  ┌──────────────┐         ┌────────────────┐                │
│  │   Cognito    │         │   RDS Aurora   │                │
│  │    (Auth)    │         │  (PostgreSQL)  │                │
│  └──────────────┘         └────────────────┘                │
│                                   │                           │
│                                   ▼                           │
│                          ┌────────────────┐                  │
│                          │   S3 Bucket    │                  │
│                          │ (User Assets)  │                  │
│                          └────────────────┘                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## AWS Services Required

### 1. Frontend Hosting
- **CloudFront**: CDN for global distribution
- **S3**: Static website hosting
- **Route 53**: DNS management (optional)

### 2. Backend API
- **API Gateway**: RESTful API endpoints
- **Lambda**: Serverless functions
- **VPC**: Network isolation (optional but recommended)

### 3. Database & Storage
- **RDS Aurora PostgreSQL**: Primary database
  - Stores: Users, Projects, Templates, Settings
- **S3**: File storage
  - Generated app files
  - User uploads
  - Export packages

### 4. Authentication
- **Cognito**: User authentication & management
  - Email/password sign-up
  - OAuth integrations (Google, GitHub)
  - JWT tokens

### 5. CI/CD
- **CodePipeline**: Automated deployments
- **CodeBuild**: Build automation
- **CodeDeploy**: Deployment automation

### 6. Monitoring
- **CloudWatch**: Logs & metrics
- **X-Ray**: Distributed tracing
- **SNS**: Alerts & notifications

## Cost Estimation (Monthly)

### Basic Setup (Development)
- EC2 (t3.medium): $30
- RDS (db.t3.micro): $15
- S3 + CloudFront: $5-10
- Lambda (100K requests): $0.20
- **Total: ~$50-60/month**

### Production Setup
- EC2 (t3.large): $60
- RDS (db.t3.medium): $60
- S3 + CloudFront: $20-50
- Lambda (1M requests): $2
- API Gateway: $3.50
- Cognito: $0 (50K MAUs free)
- **Total: ~$150-200/month**

## Setup Instructions

### Phase 1: Core Infrastructure

#### 1.1 Create RDS Database
```bash
aws rds create-db-instance \
  --db-instance-identifier app-builder-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YOUR_PASSWORD \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxx
```

#### 1.2 Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'cricket', 'ecommerce', 'social', etc.
  description TEXT,
  code_url VARCHAR(500), -- S3 URL
  preview_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Templates table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  preview_image VARCHAR(500),
  code_template JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Exports table
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  format VARCHAR(50), -- 'zip', 'github', 'apk', 'ipa'
  status VARCHAR(50), -- 'pending', 'processing', 'completed', 'failed'
  download_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 1.3 Setup Cognito
```bash
aws cognito-idp create-user-pool \
  --pool-name app-builder-users \
  --auto-verified-attributes email \
  --policies "PasswordPolicy={MinimumLength=8}"

aws cognito-idp create-user-pool-client \
  --user-pool-id us-east-1_XXXXX \
  --client-name app-builder-client \
  --no-generate-secret
```

#### 1.4 Create S3 Buckets
```bash
# Static website hosting
aws s3 mb s3://app-builder-frontend

# User assets
aws s3 mb s3://app-builder-assets

# Configure CORS
aws s3api put-bucket-cors \
  --bucket app-builder-assets \
  --cors-configuration file://cors.json
```

### Phase 2: Lambda Functions

#### 2.1 Project Management Lambda
```javascript
// lambda/projects/create.js
exports.handler = async (event) => {
  const { name, type, description } = JSON.parse(event.body);
  const userId = event.requestContext.authorizer.claims.sub;
  
  // Save to RDS
  const project = await db.query(
    'INSERT INTO projects (user_id, name, type, description) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, name, type, description]
  );
  
  return {
    statusCode: 201,
    body: JSON.stringify(project.rows[0])
  };
};
```

#### 2.2 Export Lambda
```javascript
// lambda/exports/generate.js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const { projectId, format } = JSON.parse(event.body);
  
  // Get project code
  const project = await getProject(projectId);
  
  // Generate export based on format
  let exportFile;
  switch (format) {
    case 'zip':
      exportFile = await generateZip(project);
      break;
    case 'github':
      exportFile = await pushToGitHub(project);
      break;
    case 'apk':
      exportFile = await buildAPK(project);
      break;
  }
  
  // Upload to S3
  const url = await s3.putObject({
    Bucket: 'app-builder-exports',
    Key: `${projectId}/${Date.now()}.${format}`,
    Body: exportFile
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ downloadUrl: url })
  };
};
```

### Phase 3: API Gateway Setup

```yaml
# swagger.yaml
openapi: 3.0.0
info:
  title: App Builder API
  version: 1.0.0
paths:
  /projects:
    post:
      summary: Create project
      x-amazon-apigateway-integration:
        uri: arn:aws:lambda:us-east-1:ACCOUNT:function:create-project
        httpMethod: POST
        type: aws_proxy
  
  /projects/{id}/export:
    post:
      summary: Export project
      parameters:
        - name: id
          in: path
          required: true
      x-amazon-apigateway-integration:
        uri: arn:aws:lambda:us-east-1:ACCOUNT:function:export-project
        httpMethod: POST
        type: aws_proxy
```

### Phase 4: Frontend Deployment

#### 4.1 Build & Deploy
```bash
# Build the React app
npm run build

# Upload to S3
aws s3 sync dist/ s3://app-builder-frontend

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id EXXXXXXXXXXXXX \
  --paths "/*"
```

#### 4.2 Environment Variables
Create `.env.production`:
```env
VITE_AWS_REGION=us-east-1
VITE_AWS_API_ENDPOINT=https://api.yourdomain.com
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXX
VITE_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx
VITE_S3_BUCKET=app-builder-assets
VITE_CLOUDFRONT_DOMAIN=d1234567.cloudfront.net
```

### Phase 5: EC2 Setup (Optional - for complex builds)

```bash
# Launch EC2 instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.medium \
  --key-name my-key-pair \
  --security-group-ids sg-xxxxx \
  --subnet-id subnet-xxxxx

# Install Docker for building APK/IPA
sudo yum install docker
sudo service docker start

# Install build tools
sudo yum install -y nodejs npm
npm install -g @capacitor/cli
```

## Security Best Practices

1. **VPC Configuration**
   - Place RDS in private subnet
   - Use NAT Gateway for Lambda internet access
   - Security groups with minimal permissions

2. **IAM Roles**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Action": [
         "s3:GetObject",
         "s3:PutObject"
       ],
       "Resource": "arn:aws:s3:::app-builder-*/*"
     }]
   }
   ```

3. **Cognito Settings**
   - Enable MFA
   - Set password complexity
   - Configure email verification

4. **API Gateway**
   - Enable throttling
   - Configure CORS
   - Use Cognito authorizer

## Monitoring & Logs

```bash
# CloudWatch Logs
aws logs tail /aws/lambda/create-project --follow

# Metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=create-project \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```

## Next Steps

1. ✅ Review this architecture
2. ✅ Set up AWS account & IAM users
3. ✅ Create RDS database
4. ✅ Deploy Lambda functions
5. ✅ Configure API Gateway
6. ✅ Setup Cognito
7. ✅ Deploy frontend to S3/CloudFront
8. ✅ Test end-to-end flow

## Support

For AWS-specific issues:
- AWS Documentation: https://docs.aws.amazon.com
- AWS Support: https://console.aws.amazon.com/support

For application issues:
- Check CloudWatch Logs
- Review Lambda metrics
- Test with Postman/curl
