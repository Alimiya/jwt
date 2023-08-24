# syntax=docker/dockerfile:1.4

FROM node:lts-buster-slim AS development
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci


COPY . /usr/src/app

EXPOSE 5000

CMD ["npm", "start"]

FROM development as dev-envs
RUN apt-get update \
    && apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m jwt && \
    groupadd docker && \
    usermod -aG docker jwt

COPY --from=gloursdocker/docker / /
CMD ["npm", "start"]