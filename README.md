# quickstart:

0. make sure you have these vars set in your .env.local, as well as make sure you have all technologies ready to go docker, next, etc.

NEXTAUTH_SECRET=[your next auth token]
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=[your mapbox token]
DB_USER=root
DB_HOST=localhost
DB_NAME=myfarm
DB_PASSWORD=[some password]

1. start psql server
    - `docker login` (if you havent already)
    - `docker pull postgres` (if you dont have a pg image)
    - `docker run -d --name my_postgres -e POSTGRES_USER=root -e POSTGRES_PASSWORD=[some password] -e POSTGRES_DB=myfarm -p 5432:5432 postgres`
    - create some mock accounts if this is your first time, check for `scripts/main.sql` and `scripts/mock_data.sql` 
        - copy `docker cp c:\Users\xukev\Documents\projects\thefarm\scripts\main.sql my_postgres:/main.sql`
        - exec `docker exec -i my_postgres psql -U root -d myfarm -f /path/to/script.sql`
    - hash passwords in DB by using `scripts/migrateToHash.py`
2. `npm install` (if you havent already) and then `npm run dev`
3. enjoy!






































HIGHER LEVEL TODO: 

create webpage schemas
prep db for new features (profile pic, payments, etc.)
add custom sign in / sign out / register page
add features to dashboard
refactoring codebase