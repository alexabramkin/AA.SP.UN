#https://github.com/waldekmastykarz/docker-spfx/blob/master/Dockerfile
#http://www.n8d.at/blog/how-to-run-sharepoint-pattern-and-practices-samples-through-docker/
#https://gavinb.net/2017/03/06/docker-on-windows-mounting-volumes/
#http://www.vrdmn.com/2017/01/working-with-rest-api-in-sharepoint.html

FROM node:6.10.3
ARG proj_name

EXPOSE 5432 4321 35729

RUN npm i -g gulp yo @microsoft/generator-sharepoint && \
    npm cache clean

VOLUME /usr/app/$proj_name
WORKDIR /usr/app/$proj_name

RUN useradd --create-home --shell /bin/bash spfx && \
    usermod -aG sudo spfx && \
    chown -R spfx:spfx /usr/app/$proj_name

USER spfx

RUN npm install & npm cache clean
#& rd /s /q %APPDATA%\npm-cache & for /d %G in ("%TEMP%\npm-*") do rd /s /q "%~G"

CMD /bin/bash

#docker build -t spfx:AA.SP.UN . --build-arg proj_name="AA.SP.UN"
#docker run -h spfx -it --rm --name spfx-helloworld -v $%cd%:/usr/app/spfx -p 5432:5432 -p 4321:4321 -p 35729:35729 spfx
#
