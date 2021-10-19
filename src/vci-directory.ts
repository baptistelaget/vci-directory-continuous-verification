import axios, { AxiosResponse } from 'axios';
import { Directory } from './types';

const VCI_DIRECTORY = 'https://raw.githubusercontent.com/the-commons-project/vci-directory/main/vci-issuers.json';

export const getVCIIssuers = async () => {
    const axiosResponse: AxiosResponse<Directory> = await axios.get(VCI_DIRECTORY, { headers: { 'Accept': 'application/json' } });
    return axiosResponse.data?.participating_issuers;
}