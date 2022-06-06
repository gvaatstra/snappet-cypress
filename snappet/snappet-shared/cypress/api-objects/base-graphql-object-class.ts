export enum HttpMethods{
    POST='Post',
    GET='Get',
    PUT='Put',
    DELETE='Delete',
    ALL=''
}

export class BaseGraphqlObjectClass{
    static nameInterceptAllResponse = 'response';
    static nameInterceptAllRequest = 'request';
    static nameInterceptAll = 'interceptAll';
    static path = '**/graphql'
    operationName: string;

    /**
     * Base class to extend from for specific GraphQL endpoints depending on the operationName
     * @param operationName - functional name of the API to be able to distinguish between different instances
     */
         constructor(operationName: string){
            this.operationName = operationName
        }



    private hasOperationName(req) {
        const { body } = req
        return (       
          body.hasOwnProperty('operationName') && body.operationName === this.operationName
        )
    }

    private aliasQuery(req, method: HttpMethods) {
        if (this.hasOperationName(req)) {
            req.alias = this.getWaitForRequestAlias(method)
        }
    }

    interceptAll(method: HttpMethods = HttpMethods.ALL): void{
        switch(method){
            case HttpMethods.POST:
                cy.intercept('POST', BaseGraphqlObjectClass.path, (req)=>{
                    this.aliasQuery(req, method)
                });
            break;
            case HttpMethods.GET:
                cy.intercept('GET', BaseGraphqlObjectClass.path, (req)=>{
                    this.aliasQuery(req, method)
                });
            break;
            case HttpMethods.PUT:
                cy.intercept('PUT', BaseGraphqlObjectClass.path, (req)=>{
                    this.aliasQuery(req, method)
                });
            break;
            case HttpMethods.DELETE:
                cy.intercept('DELETE', BaseGraphqlObjectClass.path, (req)=>{
                    this.aliasQuery(req, method)
                });
            break;
            case HttpMethods.ALL:
            default:
                cy.intercept(BaseGraphqlObjectClass.path, (req)=>{
                    this.aliasQuery(req, method)
                });
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
        return `${BaseGraphqlObjectClass.nameInterceptAllResponse}gql${method}${this.operationName}`
    }

    private getSaveAsRequestAlias(method: HttpMethods): string {
        return `${BaseGraphqlObjectClass.nameInterceptAllRequest}gql${method}${this.operationName}`
    }

    private getWaitForRequestAlias(method: HttpMethods): string {
        return `${BaseGraphqlObjectClass.nameInterceptAll}gql${method}${this.operationName}`
    }

    getRequest(method: HttpMethods = HttpMethods.ALL): Cypress.Chainable{
        return cy.get('@'+this.getSaveAsRequestAlias(method))
    }

    getResponse(method: HttpMethods = HttpMethods.ALL): Cypress.Chainable{
        return cy.get('@'+this.getSaveAsResponseAlias(method))
    }
}
