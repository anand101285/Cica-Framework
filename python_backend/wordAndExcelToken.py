from zipfile import ZipFile
import os
from pathlib import Path
import shutil

cwd = os.path.realpath(__file__ + '/../')
import argparse


# import win32com
def worddocToken(url, tokenid):
    ip = f'https://{url}/honeytoken/ping/{tokenid}'

    filename = "wordtoken"

    with ZipFile(Path(cwd + "/TokenFiles/" + filename + ".zip"), 'r') as zipobj:
        zipobj.extractall(Path(cwd + "/TokenFiles/" + filename))

    with open(Path(cwd + "/TokenFiles/" + filename + "/word/_rels/footer2.xml.rels"), "r") as f:
        content = f.readlines()
        f.close()
    with open(Path(cwd + "/TokenFiles/" + filename + "/word/_rels/footer2.xml.rels"), "w") as f:
        for line in content:
            line = line.replace("ngrok-link-here", ip)
            f.write(line)
    shutil.make_archive(Path(cwd + "/TokenFiles/wordtoken_client"), "zip", Path(cwd + "/TokenFiles/" + filename))
    shutil.copyfile(Path(cwd + "/TokenFiles/wordtoken_client.zip"), Path(cwd + "/TokenFiles/wordtoken_client.docx"))
    shutil.rmtree(Path(cwd + "/TokenFiles/" + filename), ignore_errors=False)
    os.remove(Path(cwd + "/TokenFiles/wordtoken_client.zip"))
    # win32com.SetupEnvironment()


def exceldocToken(url, tokenid):
    ip = f'https://{url}/api/honeytoken/ping/{tokenid}'
    filename = "exceltoken"

    with ZipFile(Path(cwd + "/TokenFiles/" + filename + ".zip"), 'r') as zipobj:
        zipobj.extractall(Path(cwd + "/TokenFiles/" + filename))

    with open(Path(cwd + "/TokenFiles/" + filename + "/xl/drawings/_rels/drawing1.xml.rels"), "r") as f:
        content = f.readlines()
        f.close()
    with open(Path(cwd + "/TokenFiles/" + filename + "/xl/drawings/_rels/drawing1.xml.rels"), "w") as f:
        for line in content:
            line = line.replace("ngrok-link-here", ip)
            f.write(line)
    shutil.make_archive(Path(cwd + "/TokenFiles/exceltoken_client"), "zip", Path(cwd + "/TokenFiles/" + filename))
    shutil.copyfile(Path(cwd + "/TokenFiles/exceltoken_client.zip"), Path(cwd + "/TokenFiles/exceltoken_client.xlsx"))
    shutil.rmtree(Path(cwd + "/TokenFiles/" + filename), ignore_errors=False)
    os.remove(Path(cwd + "/TokenFiles/exceltoken_client.zip"))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', help='add URl')
    parser.add_argument('--tokenid', help='add unique tokenid')
    parser.add_argument('--type', help='add unique tokenid')

    args = parser.parse_args()
    if (args.type == "word"):
        worddocToken(args.url, args.tokenid)
    elif (args.type == "excel"):
        exceldocToken(args.url, args.tokenid)
