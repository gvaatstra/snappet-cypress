import { ApiBasePathConfiguration, BaseAccountApiObjectClass } from "./base-account-api-object-class";

export class LessonPlansApi extends BaseAccountApiObjectClass{
    
    
    constructor(){
        super(ApiBasePathConfiguration.TEACHER_API,'*/LessonPlans/*', 'LessonPlansApi')
    }
    deleteSubject(class_id: string, subjectGroupId: string){
        cy.request('DELETE',`${ApiBasePathConfiguration.TEACHER_API}${class_id}/LessonPlans/${subjectGroupId}`)
    }
}