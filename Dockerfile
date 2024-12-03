FROM node:lts-alpine 
WORKDIR /1evCine
COPY package.json package-lock.json ./ 
RUN npm install --production 
COPY . . 
EXPOSE 5500 
CMD ["node", "Frontend/JavaScript/server.js"]

