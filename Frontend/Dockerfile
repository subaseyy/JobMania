# Dockerfile

# 1. Use official Node image as base
FROM node:20-alpine AS deps

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies separately for caching
COPY package*.json ./
RUN rm -rf .next
RUN npm install

# 4. Copy entire project
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Use a lightweight production image
FROM node:20-alpine AS runner

WORKDIR /app

# 7. Copy only the built output and necessary files
COPY --from=deps /app/public ./public
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/next.config.mjs ./next.config.mjs

# 8. Expose default Next.js port
EXPOSE 3000

# 9. Start the app
CMD ["npm", "start"]

