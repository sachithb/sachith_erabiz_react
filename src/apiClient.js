const API_URL = process.env.REACT_APP_API_URL;

export const getHeaders = () => {
    
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
    
};

// HTTP POST Request - Returns Resolved or Rejected Promise
export const post = (path, raw) => {
    var requestOptions = {
        method: 'POST',
        headers: getHeaders(),
        body: raw,
        redirect: 'follow'
    };

    return new Promise((resolve, reject) => {
        fetch(API_URL + path, requestOptions)
            .then((res) => {
                
                if (!res.ok) {
                    throw new Error("Bad request");
                }
                return res.json()
            })
            .then((result) => {
                
                resolve(result);
            }
            )
            .catch((error) => {
                reject(error);

            });
    });
};

// HTTP GET Request - Returns Resolved or Rejected Promise
export const get = (path) => {

    return new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            headers: getHeaders(),
            redirect: 'follow'
        };
        fetch(API_URL + path, requestOptions)
            .then(response => {
                // console.log(response);
                if (!response.ok) {
                    throw new Error("Bad request");
                }
                return response.json()
            })
            .then(result => {  resolve(result) })
            .catch(error => {
                
                reject(error)
            });

    });
};


