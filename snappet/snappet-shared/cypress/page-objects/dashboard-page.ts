export class DashboardPage implements BasePageObjectInterface{
 
    static url = "https://teacher.snappet.org"

    headerComponent = '.snappet-header'
    addSubjectButton = '[data-test-id=add-subject-button]'
    
    navigateTo(params?: {}): void {
        cy.visit(DashboardPage.url)
        this.waitTillLoaded()
    }

    waitTillLoaded(): void {
        cy.get(this.headerComponent).should('be.visible')
    }

    clickToAddSubject() {
        cy.url().should('contain','addsubject')
        cy.get(this.addSubjectButton).should('be.visible').click({force: true});
    }

    selectSubjectToActivate(name: string) {
        cy.findByText('Welk vak wil je activeren?',{timeout:10000}).should('be.visible')
        cy.get('subjects-dropdown>dropdown>span').should('be.visible').click()
        cy.contains('subjects-dropdown>span ul', name).findAllByText(name).scrollIntoView().click()
    }

    goToNext() {
        cy.contains('.btn','Volgende').click()
    }

    selectGrade(grade: number) {
        cy.findByText('Welk vak wil je activeren?',{timeout:10000}).should('not.exist')
        cy.findByText('Op welk niveau gaat deze groep werken?',{timeout:10000}).should('be.visible')        
        cy.contains('.grade-slider-wizard .grade-slider-tick', grade.toString()).click()
    }

    selectFirstProgram() {        
        cy.get('.cards-container .card-inner').eq(0).click()
        cy.findByText('Rond nu je vak/groep af voor',{timeout:10000}).should('be.visible')    
    }

    setTitleForSubject(subjectName: string) {
        // cy.findByLabelText('Naam van het nieuwe vak').siblings('input').clear().type('Gerwin naam vak')
        cy.contains('label', 'Naam van het nieuwe vak').siblings('input').clear().type(subjectName)
    }

    activateSubject(subjectName: string) {
        cy.contains('.btn','Vak activeren').click()
        cy.contains('subjectgroup-info-block .panel-card-heading-text-inner', subjectName).should('be.visible')
    }

}