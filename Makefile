lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start-full:
	npx start-server & npm -C frontend start

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend

	
lint:
	npx eslint .