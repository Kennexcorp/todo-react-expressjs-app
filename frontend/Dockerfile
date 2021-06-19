FROM node:14


# Create app directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./frontend/

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./frontend

# EXPOSE 3000

CMD ["yarn", "start"]
