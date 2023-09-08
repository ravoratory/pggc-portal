FROM --platform=amd64 node:18

WORKDIR /code

COPY package.json /code/ 

COPY pnpm-lock.yaml /code/

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN pnpm install

RUN pnpm build

CMD ["pnpm", "start:prod"]
