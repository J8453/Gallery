fuser -k 5000/tcp
cd frontend/
pwd
git pull
npm install
npm run build
screen -d -m -L serve -s build