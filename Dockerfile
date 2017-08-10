#
# Copyright © 2017 Logistimo.
#
# This file is part of Logistimo.
#
# Logistimo software is a mobile & web platform for supply chain management and remote temperature monitoring in
# low-resource settings, made available under the terms of the GNU Affero General Public License (AGPL).
#
# This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
# Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any
# later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
# warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
# for more details.
#
# You should have received a copy of the GNU Affero General Public License along with this program.  If not, see
# <http://www.gnu.org/licenses/>.
#
# You can be released from the requirements of the license by purchasing a commercial license. To know more about
# the commercial license, please contact us at opensource@logistimo.com


FROM node:latest

MAINTAINER dockers@logistimo.com

# Create app directory
RUN mkdir -p /usr/src/app

ENV NODE_HOME /usr/src/app

ENV LOGI_HOST=localhost \
	TEMP_HOST=localhost \
	AMS_USER=logistimo \
	AMS_PASS=logistimo \
	ES_HOST=localhost

WORKDIR $NODE_HOME

# Bundle app source
COPY . $NODE_HOME/

EXPOSE 3000 8080 9000 6400

COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
