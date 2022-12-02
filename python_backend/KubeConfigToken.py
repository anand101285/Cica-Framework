import re
import argparse
import os
import sys
import shutil
from pathlib import Path
import configparser
import base64
# adding Folder_2 to the system path
cwd = os.path.realpath(__file__+'/../')
sys.path.insert(0, cwd+'/pythonCustompackage')
from getHostname import getCanaryKubeData


def generate(url,tokenid):

    url_to_ping = f'https://{url}/honeytoken/ping/{tokenid}'
    # url_to_ping="http://f584-115-186-152-101.ngrok.io"
    # canarydata = getCanaryKubeData(url_to_ping)
    # kubedata = base64.b64decode(canarydata['kubeconfig'])
    # print(kubedata)
    with open(Path(cwd+'/TokenFiles/kubeconfig.txt'), 'r') as kubefile:
        kubedata = kubefile.readlines()
        kubefile.close()
    with open(Path(cwd + '/TokenFiles/kubeconfig_client.txt'), 'w') as kubefile:
        for data in kubedata:
            data = data.replace("URLHERE",url_to_ping)
            kubefile.write(data)
        kubefile.close()




if __name__=='__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url',help='add URl')
    parser.add_argument('--tokenid',help='add unique tokenid')


    args = parser.parse_args()

    generate(args.url,args.tokenid)

