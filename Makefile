API_VER="1.6.1"

export API_VER

install:
	npm install

backend:
	chmod +x ./utils/scripts/*
	eval "npm run api $(API_VER)"

dev:
	npm run dev
