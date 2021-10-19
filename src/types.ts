export type Issuer = {
    iss: string;
    name?: string;
    website?: string;
}

export type Directory = {
    participating_issuers: Issuer[]
}

export type Keyset = {
    keys: Key[];
}

export type Key = {
    kid: string;
    kty: string;
    use: string;
    alg: string;
    crv: string;
    x: string;
    y: string;
    x5c?: any;
}

export type KeyResponse = {
    keys: Key[];
    error?: string;
}

export type ReportEntry = KeyResponse & {
    iss: string;
    name?: string;
    website?: string;
    keys_count: number;
}

export type ReportEntries = ReportEntry[]

export type TrustedKeys  ={
    [name: string]: Key[];
}