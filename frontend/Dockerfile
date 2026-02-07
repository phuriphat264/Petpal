# เปลี่ยนจาก node:18-alpine เป็น node:20-alpine
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]