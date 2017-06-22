FROM sdongjie/node-babel:latest
WORKDIR /app/
ADD . /app
RUN yarn install --pure-lockfile
EXPOSE 6010
CMD ["yarn", "docker:pro"]
