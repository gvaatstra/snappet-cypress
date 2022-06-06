export enum HttpMethods{
    POST='Post',
    GET='Get',
    PUT='Put',
    DELETE='Delete',
    ALL=''
}

export enum ApiBasePathConfiguration{
    ACCOUNT_CONNECT='https://account.snappet.org/connect/',
    TEACHER_API='https://teacher.snappet.org/api/'
}

export class BaseAccountApiObjectClass{
    static nameInterceptAllResponse = 'response';
    static nameInterceptAllRequest = 'request';
    static nameInterceptAll = 'interceptAll';
    path: string;
    nameOfApi: string;

    /**
     * Base class to extend from for specific API endpoints
     * @example
     * //will be able to intercept every request and response for paths starting with connect/
     * new extendedClass('/connect/**', 'ConnectAll')
     * @param subpath - path of the API endpoint
     * @param nameOfApi - functional name of the API to be able to distinguish between different instances
     */
    constructor(basepathConfiguration: ApiBasePathConfiguration,subpath: string, nameOfApi: string){
        this.path = basepathConfiguration+subpath
        this.nameOfApi = nameOfApi
    }

    interceptAll(method: HttpMethods = HttpMethods.ALL): void{
        switch(method){
            case HttpMethods.POST:
                cy.intercept('POST', this.path).as(this.getWaitForRequestAlias(method));
            break;
            case HttpMethods.GET:
                cy.intercept('GET', this.path).as(this.getWaitForRequestAlias(method));
            break;
            case HttpMethods.PUT:
                cy.intercept('PUT', this.path).as(this.getWaitForRequestAlias(method));
            break;
            case HttpMethods.DELETE:
                cy.intercept('DELETE', this.path).as(this.getWaitForRequestAlias(method));
            break;
            case HttpMethods.ALL:
            default:
                cy.intercept(this.path).as(this.getWaitForRequestAlias(method));
            break;
        }
    };

    waitForRequestAndResponse(method: HttpMethods = HttpMethods.ALL): Cypress.Chainable{
        return cy.wait('@'+this.getWaitForRequestAlias(method)).then((interception) => {
            cy.wrap(interception.request).as(this.getSaveAsRequestAlias(method));
            cy.wrap(interception.response).as(this.getSaveAsResponseAlias(method));
        });
    };

    private getSaveAsResponseAlias(method: HttpMethods): string {
        return BaseAccountApiObjectClass.nameInterceptAllResponse + method + this.nameOfApi;
    }

    private getSaveAsRequestAlias(method: HttpMethods): string {
        return BaseAccountApiObjectClass.nameInterceptAllRequest + method + this.nameOfApi;
    }

    private getWaitForRequestAlias(method: HttpMethods): string {
        return BaseAccountApiObjectClass.nameInterceptAll + method + this.nameOfApi;
    }

    getRequest(method: HttpMethods = HttpMethods.ALL): Cypress.Chainable{
        return cy.get('@'+this.getSaveAsRequestAlias(method))
    }

    getResponse(method: HttpMethods = HttpMethods.ALL): Cypress.Chainable{
        return cy.get('@'+this.getSaveAsResponseAlias(method))
    }
}
