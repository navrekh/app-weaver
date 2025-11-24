# ---- Build Stage ----
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- Serve Stage ----
FROM node:18-alpine
WORKDIR /app

# Install lightweight static file server
RUN npm install -g serve

# Copy dist build from builder
COPY --from=builder /app/dist ./dist

# Expose Cloud Run port
ENV PORT=8080
EXPOSE 8080

# Start web server
CMD ["serve", "-s", "dist", "-l", "8080"]
