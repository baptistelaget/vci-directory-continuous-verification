import axios, { AxiosResponse } from 'axios';
import { Issuer, Key, KeyResponse, Keyset, ReportEntries, ReportEntry, TrustedKeys } from './types';
import * as fs from 'fs';

const JWKS_SUFFIX = "/.well-known/jwks.json";

export const getKeyset = async (url: string): Promise<KeyResponse> => {
    try {
        url = (url && url.endsWith(JWKS_SUFFIX)) ? url : `${url}${JWKS_SUFFIX}`;

        const axiosResponse: AxiosResponse<Keyset> = await axios.get(url, {
            timeout:5000,
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'VCIDirectoryContinuousVerificationScript/1.0'
            }
        })

        return {
            keys: axiosResponse?.data?.keys as Key[]
        }
    } catch (e) {
        return {
            keys: [],
            error: e?.code || 'UNKNOWN_ERROR'
        }
    }
}

export const getTrustedKeysFromReport = (report: ReportEntries): TrustedKeys => report.reduce((a, v) => ({ ...a, [v.iss]: v.keys }), {})

export const getKeySetAndCountKeysForIssuer = async (issuer: Issuer): Promise<ReportEntry | undefined> => {
    if (!issuer.iss) {
        return undefined;
    } else {
        let keys = await getKeyset(issuer.iss);
        return { ...issuer, ...keys, keys_count: keys?.keys.length}
    }

}

export const writeObjectToPathSync = (object: any, path: string) => fs.writeFileSync(path, JSON.stringify(object, undefined, 4))
