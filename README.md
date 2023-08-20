# Home Library Service

## How to start: 

 1. Clone repo: __git clone https://github.com/ekalape/nodejs2023Q2-service.git__
 2. Switch to develop branch (__feat/auth__), install dependencies
 3. Create .env file copying .env.example to the same directory
 4. Use __npm run dock:start__ to build and start docker with an app in development mode
 5. Use __npm run test:auth__  or __npm run dock:test__  for testing inside docker
 6. Use __npm run dock:scan__ for vulnerabilities inspect
 7. Api documentation you can find on __localhost:4000/doc__ (or use __https://editor-next.swagger.io/__ (File->Import file->doc/api.yaml))
 8. All the routes except __/auth/signup__, __/auth/login__, __/doc__ and __/__ (main route) are under authorization guard. 
 9. Logs level currently is maximum: 3 (*LOG_LVL* in the .env file), logs file size - 8k (the same). It will report all possible logs messages to the console, to the directory logsDir (files *log-\<number\>* and *Error-\<number\>*) and to the corrisponding volume in the docker. To check the difference, you should stop the containers(ctrl+C or *docker compose down*), change the value in the .env file and restart the server by *npm run dock:start*.

Server runs on port 4000 