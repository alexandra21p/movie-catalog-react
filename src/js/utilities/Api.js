const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

export function apiPut( url, data ) {
    return fetch( url, {
        method: "PUT",
        body: JSON.stringify( data ),
        headers,
        mode: "cors",
    } )
        .then( ( response ) =>
            response.json( ) )
        .then( ( res ) => {
            if ( !res.success ) {
                throw new Error( res.error );
            }
            return res.payload;
        } );
}
