import { HttpMethods } from "../api-objects/base-account-api-object-class";
import { UserInfoApi } from "../api-objects/user-info-api";
import { DashboardPage } from "../page-objects/dashboard-page";
import { LoginPage } from "../page-objects/login-page";

export class LoginSteps{
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
    userInfoApi = new UserInfoApi();

    loginWithUser(username: string, password: string){
        this.userInfoApi.interceptAll(HttpMethods.GET)
        this.loginPage.loginSuccessfully(username,password)
        this.userInfoApi.waitForRequestAndResponse(HttpMethods.GET)
        this.dashboardPage.waitTillLoaded();
    }
}