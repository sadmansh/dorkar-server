1. `$ brew install postgresql`
2. `$ brew install postgis`
3. `$ brew install gdal`
4. `$ createdb dorkar;`
5. `$ psql dorkar;`
6. `$ CREATE EXTENSION postgis;` 
7. `$ git clone git@github.com:sadmansh/dorkar.git`
8. Create and activate venv
9. `$ pip install -r requirements.txt`
10. `$ python manage.py makemigrations`
11. `$ python manage.py migrate`
12. `$ python manage.py runserver`
13. `$ cd client`
14. `$ yarn`
15. `$ yarn start`

# Todo
1. Create API endpoint to send SMS to user phone number
2. List all services created by users in dashboard
3. Let users CRUD services