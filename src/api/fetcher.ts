const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

type FetchParameters = Parameters<typeof fetch>;
type PostRequestInit = Omit<FetchParameters[1], 'body'> & {
    body: Record<string, unknown>
}

function fetcher(...args: FetchParameters) {
    return fetch(...args)
        .then((res) => res.json());
}

function postRequest(requestInfo: FetchParameters[0], requestInit: PostRequestInit) {
    return fetcher(
        requestInfo,
        {
            ...requestInit,
            body: JSON.stringify(requestInit.body),
            method: METHOD_POST
        }
    );
}

function getRequest(requestInfo: FetchParameters[0], requestInit: FetchParameters[1]) {
    return fetcher(
        requestInfo,
        {
            ...requestInit,
            method: METHOD_GET
        }
    );
}

export const httpRequest = {
    get: getRequest,
    post: postRequest
};