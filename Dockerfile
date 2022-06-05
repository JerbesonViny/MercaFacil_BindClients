FROM node:16.15.0

WORKDIR /code

# Add package files
COPY package*.json ./
COPY yarn.lock ./

# Install deps
RUN yarn install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

EXPOSE 5000

CMD ["yarn", "dev"]
