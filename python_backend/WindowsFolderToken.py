import re
import argparse
import os
import sys
import shutil
from pathlib import Path
import configparser

# adding Folder_2 to the system path
cwd = os.path.realpath(__file__+'/../')
sys.path.insert(0, cwd+'/pythonCustompackage')
from getHostname import getCanaryHostname


def generate(url,tokenid):
    config=configparser.ConfigParser()

    url_to_ping = f'https://{url}/honeytoken/ping/{tokenid}'
    canarydata = getCanaryHostname(url_to_ping)

    hostname = canarydata['Hostname']
    hostname = hostname.replace('https://',"")
    hostname = hostname.replace('http://', "")
    desktop_ini = ["[.ShellClassInfo]\r\n",
                   f"IconResource=\\\\%USERNAME%.%COMPUTERNAME%.%USERDOMAIN%.INI.{hostname}\\resource.dll\r\n"]
    with open(Path(cwd+'/TokenFiles/folderToken_client/My Documents/desktop.ini'), 'w') as configfile:
        configfile.writelines(desktop_ini)
        configfile.close()


    shutil.make_archive(Path(cwd+'/TokenFiles/folderToken_client'),'zip',Path(cwd+'/TokenFiles/folderToken_client'))

if __name__=='__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url',help='add URl')
    parser.add_argument('--tokenid',help='add unique tokenid')


    args = parser.parse_args()

    generate(args.url,args.tokenid)

