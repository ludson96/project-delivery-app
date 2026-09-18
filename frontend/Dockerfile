FROM node:20-alpine
WORKDIR /frontend
COPY package* ./
RUN npm install --legacy-peer-deps
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]