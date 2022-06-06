import {LoginSteps} from "../../../snappet-shared/cypress/steps/login-steps";
import {DashboardSteps} from '../../../snappet-shared/cypress/steps/dashboard-steps'
import { ApiSteps } from "../../../snappet-shared/cypress/steps/api-steps";


describe('Testcase for Snappet', ()=>{
    const login = new LoginSteps();
    const dashboard = new DashboardSteps();
    const api = new ApiSteps()
    

    beforeEach(()=>{
        api.setupUserInfoIntercept()
        api.setupGetBootstrapInfoIntercept()
        cy.visit("/")
        login.loginWithUser(Cypress.env('username'),Cypress.env('password'))
        api.awaitAndSaveAuthorization()
        api.removeAllAvailableCourses()
    })

    it('should add a subject',()=>{
        dashboard.addSubject('Burgerschap',4,'Cypress subject name')
    })
})