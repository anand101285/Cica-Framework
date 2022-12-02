const honeytokens = {
  worddoc: {
    name: "Libre Word Document",
    downloadable: true,
  },

  excel_vba: {
    name: "Excel Macro Document",
    downloadable: true,
  },
  linux_bashrc: {
    name: "Linux Switch User Token",
    downloadable: true,
  },
  mysql_master: {
    name: "My Sql",
    downloadable: true,
  },
  aws_keys: {
    name: "AWS Config Keys",
    downloadable: true,
  },
  kubeconfig: {
    name: "Kube Configurations",
    downloadable: true,
  },
  word: {
    name: "Microsoft Word Document",
    downloadable: true,
  },
  excel: {
    name: "Microsoft Excel Document",
    downloadable: true,
  },
};
arr = ["asd", "asd1", "asd2"];
console.log(
  Object.keys(honeytokens).map((key, index) => {
    return "" + key, "  ", index, " data ", honeytokens[key];
  })
);

console.log(
  arr.map(data => {
    return "hellp " + data;
  })
);
