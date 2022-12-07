FROM node:16-alpine
WORKDIR /app
RUN git clone https://github.com/savchuckvadim/chat_client
RUN cd ./chat_client
COPY package.json .
RUN npm install
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["forever", "start", "./chat_client/build/index.html"]