# Development note

## Dev

1. frond end project `zhishe-cms-web` can be now developed independently of the back end.

   you can switch between mock env and local backend env by modifying the `VUE_APP_BASE_API` in `.env.development`:

   ```js{5}
   # just a flag
   ENV = 'development'
   
   # base api
   VUE_APP_BASE_API = '/dev-api' # use mock data
   # VUE_APP_BASE_API = 'http://localhost:8888' # use local backend
   ```

   


## GitHub & Git

1. DO NOT develop in `master` branch directly

   everyone MUST develop in `dev` branch, and make pr when need merge to `master`

2. git commit message follows to `git-messge` guide