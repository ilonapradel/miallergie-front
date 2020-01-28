FROM kusumoto/docker-ionic-android-sdk


# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source code
COPY . ./

RUN npm run build:android
COPY my-release-key.keystore ./
RUN echo "miallergie" | jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /home/jenkins/miam.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
RUN npm run build:web