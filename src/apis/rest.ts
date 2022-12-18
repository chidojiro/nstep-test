type Params = Record<string, string | number | boolean | (string | number | boolean)[]>;

export type RestApisConfig = {
  baseURL?: string;
  headers?: HeadersInit;
  params?: Params;
  credentials?: RequestCredentials;
  referrerPolicy?: ReferrerPolicy;
  isFormData?: boolean;
};

const DEFAULT_BASE_URL = 'https://www.fruityvice.com';

const getRequestHeadersWithDefaultValue = (configs?: RestApisConfig) => {
  const { headers, isFormData } = configs ?? {};
  const requestHeaders = headers as any;
  const accessToken = localStorage.getItem('token');

  return {
    ...requestHeaders,
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    ...(isFormData
      ? {}
      : {
          'Content-Type':
            requestHeaders?.['Content-Type'] ??
            requestHeaders?.['content-type'] ??
            'application/json',
        }),
  };
};

const parseRequestData = (data: any, headers: any) =>
  headers['Content-Type'] === 'application/json' ? JSON.stringify(data) : (data as any);

const getEndpointWithParams = (endpoint: string, params?: Params) => {
  const paramsInString = new URLSearchParams(params as any).toString();

  if (paramsInString) return [DEFAULT_BASE_URL + endpoint, paramsInString].join('?');

  return DEFAULT_BASE_URL + endpoint;
};

const DEFAULT_REFERRER_POLICY = 'no-referrer';

const get = async <TResponseData = unknown>(
  endpoint: string,
  config?: RestApisConfig,
): Promise<TResponseData> => {
  const {
    params,
    referrerPolicy = DEFAULT_REFERRER_POLICY,
    credentials = 'include',
    ...restConfig
  } = config ?? {};
  const headers = getRequestHeadersWithDefaultValue(config);

  const response = await fetch(getEndpointWithParams(endpoint, params), {
    method: 'GET',
    headers,
    referrerPolicy,
    credentials,
    mode: 'no-cors',
    ...restConfig,
  });

  if (response.ok) {
    const results = (await response.json()) as any;
    return results.data || results;
  }

  throw new Error(await response.json());
};

const post = async <TResponseData = unknown, TRequestData = unknown>(
  endpoint: string,
  data?: TRequestData,
  config?: RestApisConfig,
): Promise<TResponseData> => {
  const {
    params,
    referrerPolicy = DEFAULT_REFERRER_POLICY,
    credentials = 'include',
    ...restConfig
  } = config ?? {};
  const headers = getRequestHeadersWithDefaultValue(config);

  const response = await fetch(getEndpointWithParams(endpoint, params), {
    method: 'POST',
    headers,
    referrerPolicy,
    body: parseRequestData(data, headers),
    credentials,
    mode: 'no-cors',
    ...restConfig,
  });

  if (response.ok) {
    const results = (await response.json()) as any;
    return results.data || results;
  }

  throw response;
};

const put = async <TResponseData = unknown>(
  endpoint: string,
  data?: unknown,
  config?: RestApisConfig,
): Promise<TResponseData> => {
  const {
    params,
    referrerPolicy = DEFAULT_REFERRER_POLICY,
    credentials = 'include',
    ...restConfig
  } = config ?? {};
  const headers = getRequestHeadersWithDefaultValue(config);

  const response = await fetch(getEndpointWithParams(endpoint, params), {
    method: 'PUT',
    headers,
    referrerPolicy,
    body: parseRequestData(data, headers),
    credentials,
    mode: 'no-cors',
    ...restConfig,
  });

  if (response.ok) {
    const results = (await response.json()) as any;
    return results.data || results;
  }

  throw new Error(await response.json());
};

const patch = async <TResponseData = unknown>(
  endpoint: string,
  data?: unknown,
  config?: RestApisConfig,
): Promise<TResponseData> => {
  const {
    params,
    referrerPolicy = DEFAULT_REFERRER_POLICY,
    credentials = 'include',
    ...restConfig
  } = config ?? {};
  const headers = getRequestHeadersWithDefaultValue(config);

  const response = await fetch(getEndpointWithParams(endpoint, params), {
    method: 'PATCH',
    headers,
    referrerPolicy,
    body: parseRequestData(data, headers),
    credentials,
    mode: 'no-cors',
    ...restConfig,
  });

  if (response.ok) {
    const results = (await response.json()) as any;
    return results.data || results;
  }

  throw new Error(await response.json());
};

const _delete = async <TResponseData = unknown>(
  endpoint: string,
  config: RestApisConfig,
): Promise<TResponseData> => {
  const {
    params,
    referrerPolicy = DEFAULT_REFERRER_POLICY,
    credentials = 'include',
    ...restConfig
  } = config ?? {};
  const headers = getRequestHeadersWithDefaultValue(config);

  const response = await fetch(getEndpointWithParams(endpoint, params), {
    method: 'POST',
    headers,
    referrerPolicy,
    credentials,
    ...restConfig,
  });

  if (response.ok) {
    const results = (await response.json()) as any;
    return results.data || results;
  }

  throw new Error(await response.json());
};

export const RestApis = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};
