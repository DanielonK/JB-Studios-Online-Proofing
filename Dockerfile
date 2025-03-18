FROM node:18-alpine
WORKDIR /app

# Copy backend files correctly
COPY backend/package*.json ./
RUN npm install
COPY backend/ . 

EXPOSE 5000

CMD ["node", "server.js"]
