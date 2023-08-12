# Home Library Service

## How to start: 

 1. Clone repo: __git clone https://github.com/ekalape/nodejs2023Q2-service.git__
 2. Install dependencies, switch to develop branch
 3. Create .env file copying .env.example to the same directory
 4. Use __npm run dock:start__ to build and start docker with an app in development mode
 5. Use __npm run dock:test__ for testing inside docker
 6. Use __npm run dock:scan__ for vulnerabilities inspect
 7. Api documentation you can find on __localhost:4000/doc__ (or use __https://editor-next.swagger.io/__ (File->Import file->doc/api.yaml))


Server runs on port 4000 