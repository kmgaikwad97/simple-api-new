FROM node:14
WORKDIR ./apps
COPY package*.json ./
RUN npm install 
COPY . . 
EXPOSE 4000
CMD ["npm","start"]