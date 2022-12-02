import requests
import json
import os
from pathlib import Path
cwd = os.path.realpath(__file__+'/../')
custompackagepath=Path(cwd)
# custompackagepath = Path(cwd+'/pythonCustompackage/')
def getCanaryHostname(ngroklink):
    with open(custompackagepath/'req_body.txt', 'r') as f:
        lines = f.readlines()

    with open(custompackagepath/'req_bodyforclient.txt', 'w') as f:
        for line in lines:
            line = line.replace('ngrok-link-here', ngroklink)
            f.write(line)
    url="https://canarytokens.com/generate"
    header={'Content-Type': 'multipart/form-data; boundary=---------------------------272676671639515930431396986561','Content-Length': '702'}
    s = requests.Session()
    with open(custompackagepath/'req_bodyforclient.txt','r') as req:
        x = requests.Request('POST',url,headers=header,files={'name':req}).prepare()
        resp = s.send(x)
        canaryresdata = json.loads(resp.text)
        print(canaryresdata)
        return canaryresdata

def getCanaryAwsData(ngroklink):
    with open(custompackagepath/'req_body_aws.txt', 'r') as f:
        lines = f.readlines()

    with open(custompackagepath/'req_bodyforclient.txt', 'w') as f:
        for line in lines:
            line = line.replace('ngrok-link-here', ngroklink)
            f.write(line)
    url="https://canarytokens.com/generate"
    header={'Content-Type': 'multipart/form-data; boundary=---------------------------272676671639515930431396986561','Content-Length': '702'}
    s = requests.Session()
    with open(custompackagepath/'req_bodyforclient.txt','r') as req:
        x = requests.Request('POST',url,headers=header,files={'name':req}).prepare()
        resp = s.send(x)
        canaryresdata = json.loads(resp.text)
        print(canaryresdata)
        return canaryresdata

def getCanaryKubeData(ngroklink):
    with open(custompackagepath/'req_body_kube.txt', 'r') as f:
        lines = f.readlines()

    with open(custompackagepath/'req_bodyforclient.txt', 'w') as f:
        for line in lines:
            line = line.replace('ngrok-link-here', ngroklink)
            f.write(line)
    url="https://canarytokens.com/generate"
    header={'Content-Type': 'multipart/form-data; boundary=---------------------------272676671639515930431396986561','Content-Length': '702'}
    s = requests.Session()
    with open(custompackagepath/'req_bodyforclient.txt','r') as req:
        x = requests.Request('POST',url,headers=header,files={'name':req}).prepare()
        resp = s.send(x)
        canaryresdata = json.loads(resp.text)
        print(canaryresdata)
        return canaryresdata

