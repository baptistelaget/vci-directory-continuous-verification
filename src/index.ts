import { ReportEntries, ReportEntry } from './types';
import { getKeySetAndCountKeysForIssuer, getTrustedKeysFromReport, writeObjectToPathSync } from './utils';
import { getVCIIssuers } from './vci-directory';

const OUT_FILE_REPORT = './output/report.json';
const OUT_FILE_REPORT_ERRORS = './output/errors.json';
const OUT_FILE_KEYS = './output/keys.json';

(async () => {

    const issuers = await getVCIIssuers();

    const report: ReportEntries = [];

    for (let issuer of issuers) {
        const reportEntry: ReportEntry = await getKeySetAndCountKeysForIssuer(issuer);

        if (reportEntry) {
            report.push(reportEntry)
        }
    }
    const keys = getTrustedKeysFromReport(report);

    const errors = report.filter(entry =>!!entry.error);

    writeObjectToPathSync(report, OUT_FILE_REPORT);
    writeObjectToPathSync(errors, OUT_FILE_REPORT_ERRORS);
    writeObjectToPathSync(keys, OUT_FILE_KEYS);

})();