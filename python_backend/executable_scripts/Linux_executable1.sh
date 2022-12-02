username=test4
sudo useradd -m -p pasmCVpSZOMAY $username
echo "curl -s -o /dev/null https://localhost:5000/honeytoken/ping/635d5585e535d6830434c712" >> /home/$username/.bashrc

