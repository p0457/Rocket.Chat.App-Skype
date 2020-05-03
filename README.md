# Rocket.Chat.App-Skype

Start a Skype call from inside Rocket.Chat with a slash command.

## Configuration

Type `/skype username` to generate a call-me URL.

## Docker
A Dockerfile and docker-compose are provided.

Build the docker image and run it to deploy to your server:
`docker build -t rocketchatapp_skype . && docker run -it --rm -e URL=YOUR_SERVER -e USERNAME=YOUR_USERNAME -e PASSWORD=YOUR_PASSWORD rocketchatapp_skype`

Build the docker image and run docker-compose to deploy to your server:
`docker build -t rocketchatapp_skype . && docker-compose run --rm -e URL=YOUR_SERVER -e USERNAME=YOUR_USERNAME -e PASSWORD=YOUR_PASSWORD rocketchatapp_skype`