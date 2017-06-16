FROM node:boron

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY . $HOME/instawatch/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/instawatch
RUN npm install

USER root
COPY . $HOME/instawatch
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "run", "production"]
