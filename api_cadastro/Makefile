all: 
	install
	run

install:
	python3 -m pip install Django djangorestframework
	python3 -m pip install django-cors-headers
	

migre:
	python3 manage.py makemigrations 
	python3 manage.py migrate

apaga:
	rm db.sqlite3

run:
	python3 manage.py runserver

git:
	git config --global user.email "snunesadiers@gmail.com"
	git config --global user.name  "SNunesA"
