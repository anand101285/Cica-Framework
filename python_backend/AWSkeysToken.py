import re
import argparse
import os
import sys
import shutil
from pathlib import Path
import configparser

cwd = os.path.realpath(__file__ + '/../')
sys.path.insert(0, cwd + '/pythonCustompackage')
from getHostname import getCanaryAwsData


def generate(url, tokenid):
    url_to_ping = f'https://{url}/honeytoken/ping/{tokenid}'
    canarydata = getCanaryAwsData(url_to_ping)
    towriteinaws = f"[default]\naws_access_key={canarydata['aws_access_key_id']}\naws_secret_access_key={canarydata['aws_secret_access_key']}\nregion={canarydata['region']}\noutput=json"

    with open(Path(cwd + '/TokenFiles/aws_keys_client.txt'), 'w') as awsfile:
        awsfile.writelines(towriteinaws)
        awsfile.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', help='add URl')
    parser.add_argument('--tokenid', help='add unique tokenid')

    args = parser.parse_args()

    generate(args.url, args.tokenid)
