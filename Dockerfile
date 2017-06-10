FROM node:latest

MAINTAINER <docker@logistimo.com>

# Create app directory
RUN mkdir -p /usr/src/app

ENV NODE_HOME /usr/src/app

ENV LOGI_HOST=localhost \
	LOGI_PORT=8080 \
	TEMP_HOST=localhost \
	TEMP_PORT=9000 \
	APPROVAL_HOST=localhost \
	APPROVAL_PORT=6400

WORKDIR $NODE_HOME

# Bundle app source
COPY . $NODE_HOME/

RUN npm install

EXPOSE 3000 8080 9000 6400

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]

#CMD [ "npm", "start" ]