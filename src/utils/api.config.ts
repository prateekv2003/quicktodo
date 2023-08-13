const ApiEndpoints = {
    baseUrl: 'apimocha.com/quicksell',
    scheme: 'https'
}

export const Api = {
    getDataApi: (): string => {
        return `${ApiEndpoints.scheme}://${ApiEndpoints.baseUrl}/data`
    }
}