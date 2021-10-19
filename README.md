# VCI Directory Continuous Verification Scripts

This project contains a seried of scripts that will

- Fetch the list of trusted issuers from the [VCI Directory](https://github.com/the-commons-project/vci-directory)
- Verify the validity of each link, i.e. can a GET request can be made to the list
- Outputs different files:
  - A JSON report (`report.json`) that contains a list of issuers, the number of keys fetched or the error from Axios if applicable;
  - A JSON report of errors (`errors.json`). Same format as `report.json`, but only contains issuers which triggered an error while fetching their keys;
  - A JSON file with all the keys (`keys.json`)



## Getting started

Install packages:

```
npm install
```

Build & start

```
npm run build
npm run start
```

Output will be written to the `output/` directory.
