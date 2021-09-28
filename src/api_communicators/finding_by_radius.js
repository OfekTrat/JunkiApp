import ApiConstants from './api_constants';
import { Request, fetch, Headers } from 'cross-fetch'


export default class GetFindingByRadius {
    static URI = '/finding/by_radius';
    static METHOD = "POST";


    static get(response_listener, payload) {
        const request = this.buildRequest(payload);
        fetch(request).then(response => response.json()
        ).then(data => {
            response_listener(data["result"]);
        }

        ).catch(error => {
            console.log(error);
        });
    }

    static buildRequest(payload) {
        const url = "http://".concat(ApiConstants.HOST, this.URI);
        return new Request(
            url,
            {
                method: this.METHOD,
                body: JSON.stringify(payload),
                headers: this.buildHeaders()
            }
        );
    }

    static buildHeaders() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    
}
