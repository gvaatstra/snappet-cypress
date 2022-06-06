import { DashboardPage } from "./dashboard-page";

export class LoginPage implements BasePageObjectInterface{
    fullUrl = 'https://account.snappet.org/Login';

    loginButton = 'button[type=submit]';
    usernameInput = '#Input_Username';
    passwordInput = '#password-input';

    navigateTo(params?: {}): void {
        cy.visit(this.fullUrl);
        this.waitTillLoaded();
    }

    waitTillLoaded(): void {
        cy.get(this.usernameInput).should('be.visible');
        cy.get(this.passwordInput).should('be.visible');
        cy.get(this.loginButton).should('be.visible');
    }

    loginSuccessfully(username: string, password: string) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLoginButton();
        cy.url().should('contain',DashboardPage.url)
    }

    fillUsername(username: string){
        cy.get(this.usernameInput).type(username);
    }

    fillPassword(password: string){
        cy.get(this.passwordInput).type(password, {log: false});
    }

    clickLoginButton(){
        cy.get(this.loginButton).click();
    }
}