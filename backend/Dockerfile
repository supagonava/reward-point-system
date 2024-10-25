FROM node:18

WORKDIR /app

COPY package*.json ./

# ติดตั้ง dependencies และ rebuild bcrypt
RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
