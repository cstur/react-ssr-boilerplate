FROM node:boron

RUN mkdir -p /app

# Install app dependencies
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Launch Application
CMD [ "npm", "start" ]

USER node
