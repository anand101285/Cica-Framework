import {
  // MacroExcelIcon,
  LibreIcon,
  LinuxIcon,
  AwsIcon,
  KubernetesIcon,
  MswordIcon,
  MsExcelIcon,
  GifIcon,
  HtmlIcon,
  HostIcon,
  DnsIcon,
  RegistryIcon,
  CmdIcon,
  ApiIcon
} from './../icons/icons';

const honeytokens = {
  worddoc: {
    name: 'Libre Word Document',
    icon: LibreIcon,
    downloadable: true,
    mitreDetect: ['File', 'WMI']
  },

  // excel_vba: {
  //   name: 'Excel Macro Document',
  //   icon: MacroExcelIcon,
  //   downloadable: true,
  //   mitreDetect: ['Persona', 'File', 'Group']
  // },
  linux_bashrc: {
    name: 'Linux Switch User Token',
    icon: LinuxIcon,
    downloadable: true,
    mitreDetect: ['Logon Session', 'User Account']
  },
  mysql_master: {
    name: 'My Sql',
    icon: 'logos:mysql',
    downloadable: true,
    mitreDetect: ['File', 'WMI']
  },
  aws_keys: {
    name: 'AWS Config Keys',
    icon: AwsIcon,
    downloadable: true,
    mitreDetect: ['Instance', 'Cloud Storage']
  },
  kubeconfig: {
    name: 'Kube Configurations',
    icon: KubernetesIcon,
    downloadable: true,
    mitreDetect: ['Pod']
  },
  word: {
    name: 'Microsoft Word Document',
    icon: MswordIcon,
    downloadable: true,
    mitreDetect: ['File', 'WMI']
  },
  excel: {
    name: 'Microsoft Excel Document',
    icon: MsExcelIcon,
    downloadable: true,
    mitreDetect: ['File', 'WMI']
  },
  web_gif: {
    name: 'Gif Web Link',
    icon: GifIcon,
    downloadable: false,
    mitreDetect: ['Network Traffic', 'Domain Name']
  },
  content_without_source: {
    name: 'Page without source code',
    icon: HtmlIcon,
    downloadable: false,
    mitreDetect: ['Network Traffic', 'Domain Name']
  },
  hostFile: {
    name: 'Host File',
    icon: HostIcon,
    downloadable: true,
    mitreDetect: ['Domain Name', 'Persona', 'File', 'Group']
  },
  dnsToken: {
    name: 'DNS token',
    icon: DnsIcon,
    downloadable: false,
    mitreDetect: ['Network Traffic', 'Domain Name', 'Application Log']
  },
  registry_process: {
    name: 'Registry klist Command Monitor',
    icon: RegistryIcon,
    downloadable: true,
    mitreDetect: ['Process', 'Command', 'Windows Registry']
  },
  windows_batch: {
    name: 'Windows Bat File',
    icon: CmdIcon,
    downloadable: true,
    mitreDetect: ['File', 'Script']
  },
  fakeApi: {
    name: 'Fake Api Data',
    icon: ApiIcon,
    downloadable: true,
    mitreDetect: ['File', 'WMI']
  }
};

const getDetails = (type) => {
  switch (type) {
    case 'worddoc':
      return {
        description:
          'A Honeytoken triggered through web link, concealed as a normal .doc document. This honeytoken can be accessed by OpenOffice,  Libre Office, WPS, Microsoft Word and other softwares that support .doc file.',
        attackPath:
          "The document will contain fake information regarding company details. Since hacker is keenly looking for sensitive details, such tokens are very useful in getting attackers attention. After getting accessed by intruder, the token will be triggered revealing attacker's identity.",
        use: 'Where to deploy:  Libre Office tokens are very versatile honeytokens and can be deployed anywhere in the system or network. We recommend to deploy these tokens in 1) Shared Files over a network 2) Easy to access areas of a system  for instance documents folder on a system. 3) Honeypots 4) Servers'
      };
    case 'excel_vba':
      return {
        description: 'excel_vba desc',
        attackPath: 'attackPath of excel_vba',
        use: 'Where to deploy:  Libre Office tokens are very versatile honeytokens and can be deployed anywhere in the system or network. We recommend to deploy these tokens in 1) Shared Files over a network 2) Easy to access areas of a system  for instance documents folder on a system. 3) Honeypots 4) Servers'
      };
    case 'web_gif':
      return {
        description: 'web_gif desc',
        attackPath: 'attack path webgif',
        use: "Insert this tag in the page where you don't want an attacker to visit it, when this image is accessed from our url the token will be triggered and the gif image will be shown on the page"
      };
    case 'linux_bashrc':
      return {
        description:
          ' A honey token embedded in sh file generated for Linux operating system. Upon providing a name a new user will be created in the operating system. The token is triggered when someone switches to the generated user directory.',
        attackPath:
          " The new user itself is a token, disguising itself as a normal user directory. Attacker's switch users and look for directories that might have important data. This token is a mouse trap, attracting attackers to look into the directory and make them take the bait of getting caught.",
        use: 'Where to deploy: VM machines and other system running Linux operating system .'
      };
    case 'aws_keys':
      return {
        description:
          'This token will provide you with the aws keys file, that a user can store in any directory, when an attacker get access to this file he/she will try to get details of server using these keys and the token will be triggered',
        attackPath:
          'This Token will work as a lure for an attacker as the aws key leak is a critical bug and can cause a serious damange to company assets, when attacker tries to acces these key the token will be triggered ',
        use: 'This file can be put anywhere on the system where you think an attacker can reach. This token will be more effective if this file is stored along with other keys or in a predicted path where keys are used to be store.'
      };
    case 'mysql_master':
      return {
        description:
          'This token is disguised as an MySql dump file , which usually exist on the database directory of mysql, when this token accessed by an attacker it will be triggered',
        attackPath:
          'When an attacker get hold of this file he will try to view data columns and rows inside this dump file by importing it inside the mysql database , during import this token will be triggered',
        use: 'To use this honeytoken more effectively , put this file besides other dump file or backup data, so that it seems original to an attacker.'
      };
    case 'kubeconfig':
      return {
        description:
          'This Token is Kubernetes configuration token , Kubernetes Configuration file are used to estabilish a connection to kubernetes pods or nodes, if these file are leaked to an attacker , they can get access to all the applications running there',
        attackPath:
          'This token will be an encrypted configuration file of kubernetes, placed on the server, whenever an attacker get access to this file they will try to get server details or pods details during which the token will be trigged',
        use: 'To use this token more effectively, place this token beside the files of configuration or inside the kubernetes directory, this will look more legitimate to an attacker.'
      };

    case 'word':
      return {
        description: 'This Token will be a Word Document, which may seems important for a company',
        attackPath:
          'When this word document is opened by an attacker to preview company details it will be trigged and alert is shown of the decepticon server',
        use: 'Usually this token can be placed anywhere on the system, beside other documents on the main desktop screen , or on shared drive'
      };
    case 'excel':
      return {
        description:
          'This Token will be an Excel Document, which may seems important for a company ',
        attackPath:
          'When this excel document is opened by an attacker to preview company details it will be trigged and alert is shown of the decepticon server',
        use: 'Usually this token can be placed anywhere on the system, beside other documents on the main desktop screen , or on shared drive.'
      };
    case 'content_without_source':
      return {
        description:
          'This token preview an image or a gif file on the server but when the backend code of site (i.e html, js) is viewed there will be no source code. ',
        attackPath:
          'This token will work on the static site or pages that will preview the gif or an image and the token will be triggered once visited.',
        use: 'This token can only be placed on the site, so that an attacker can visit it. this page will have no link to the original page, and its is mostly used to trigger, the scan of attacker that are trying to bruteforce the site for content directories '
      };
    case 'hostFile':
      return {
        description:
          'This token is a host file of the linux or windows system, these files contain the ip address of server, access these using a url',
        attackPath:
          'This token will contain a fake url or server detail , which will trigger the token when visited.',
        use: 'This token is placed where the host file of Operating System exists. for windows it can be on C:\\Windows\\System32\\Drivers\\etc\\hosts.'
      };
    case 'dnsToken':
      return {
        description:
          'This token will generate a link that will redirect an attacker to google.com site.',
        attackPath:
          'The Link can be placed anywhere where there is a possibility of an attacker to reach, such as inside files , documments , slides, network share drives, chats, history etc.',
        use: 'When this token is generated the link can be placed anywhere, when an attacker tries to preview the link by visiting it the token will be triggered.'
      };

    case 'registry_process':
      return {
        description:
          'This token will generate a registry file for windows operating system, on running the registry file , the token will already be placed.',
        attackPath:
          'This token will watch for klist commands running on the system , so that when this command is executed it will trigger the token.',
        use: 'This token can only be used on the Windows Operating System in registry file , and command will be watched on whole operating system.'
      };
    case 'windows_batch':
      return {
        description:
          'This token is a bat file for windows that, will generate an alert when it is run by an attacker.',
        attackPath:
          'This token can prevent the attacker to inject malicious payload it softwares , when an attacker tries to use this, the token will be generated.',
        use: 'This token can be placed anywhere on windows machine, when an attacker tries to preview it the token will be triggered'
      };
    case 'fakeApi':
      return {
        description:
          'This token will generate a json file , that can be imbeded into the api testing software such as insomia, postman etc.',
        attackPath:
          'When this token is imported by an attacker in insomia or any other software, they will try to run the request to get the details from server. During this the token will be accessed an attacker will be exposed.',
        use: 'This token can be placed anywhere on the system where there is a possibilty of an attacker to reach.'
      };
    default:
      return {
        description: 'Data not avaliable for this token',
        attackPath: 'Data not avaliable for this token',
        use: 'Where to deploy:  Libre Office tokens are very versatile honeytokens and can be deployed anywhere in the system or network. We recommend to deploy these tokens in 1) Shared Files over a network 2) Easy to access areas of a system  for instance documents folder on a system. 3) Honeypots 4) Servers'
      };
  }
};

// arrOfDetectionTypes.includes(tokenMitreDetec[i])
const getMitrePathToken = (arrOfDetectionTypes) => {
  const validHoneyToken = {};
  Object.keys(honeytokens).forEach((key) => {
    const tokenMitreDetec = honeytokens[key].mitreDetect;
    for (let i = 0; i < tokenMitreDetec.length; i++) {
      for (let j = 0; j < arrOfDetectionTypes.length; j++) {
        if (arrOfDetectionTypes[j].includes(tokenMitreDetec[i])) {
          validHoneyToken[key] = honeytokens[key];
          break;
        }
      }
    }
  });
  return validHoneyToken;
};

export { getDetails, honeytokens, getMitrePathToken };
