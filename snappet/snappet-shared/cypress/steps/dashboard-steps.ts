import { DashboardPage } from "../page-objects/dashboard-page";

export class DashboardSteps{
    dashboardPage = new DashboardPage();

    
    addSubject(name: string, grade: number, subjectName: string){
        this.dashboardPage.clickToAddSubject();
        this.dashboardPage.selectSubjectToActivate(name)
        this.dashboardPage.goToNext()
        this.dashboardPage.selectGrade(grade)
        this.dashboardPage.goToNext()
        this.dashboardPage.selectFirstProgram()
        this.dashboardPage.setTitleForSubject(subjectName)
        this.dashboardPage.activateSubject(subjectName)      
        
        cy.wait(200)

    }
}