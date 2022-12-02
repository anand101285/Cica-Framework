import re
import argparse
import os
import sys
import base64
from pathlib import Path
# adding Folder_2 to the system path

cwd = os.path.realpath(__file__+'/../')
sys.path.insert(0, cwd+'/pythonCustompackage')
from getHostname import getCanaryHostname


def generate(url,tokenid):
    url_to_ping = f'http://{url}/honeytoken/ping/{tokenid}'
    canarydata = getCanaryHostname(url_to_ping)
    hostname = canarydata['Hostname']
    MasterQuery = f"SET @bb = CONCAT(\"CHANGE MASTER TO MASTER_PASSWORD='my-secret-pw',MASTER_HOST='{hostname}', MASTER_USER='counterintelligenceframework\", @@lc_time_names, @@hostname, \"';\");"
    t = MasterQuery.encode("ascii")
    base64_bytes = base64.b64encode(t)
    base64_string = base64_bytes.decode("ascii")

    with open(Path(cwd+'/TokenFiles/Mysqltoken.txt'), 'rb') as f:
        lines = f.readlines()

    with open(Path(cwd+'/TokenFiles/Mysqltokenclient.sql'), 'wb') as f:
        for line in lines:
            line = line.replace(b'base64masterhere', base64_string.encode())
            f.write(line)

if __name__=='__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url',help='add URl')
    parser.add_argument('--tokenid',help='add unique tokenid')


    args = parser.parse_args()

    generate(args.url,args.tokenid)

