import { HttpMethods } from "../api-objects/base-account-api-object-class"
import { BootstrapInfoGraphql } from "../api-objects/bootstrap-info-graphql"
import { LessonPlansApi } from "../api-objects/lesson-plans-api"
import { UserInfoApi, UserInfoFields } from "../api-objects/user-info-api"

export class ApiSteps{
  
    bootstrapInfo = new BootstrapInfoGraphql()
    userInfo = new UserInfoApi()
    lessonPlan = new LessonPlansApi()

    bearer: string;

    setupGetBootstrapInfoIntercept() {
        this.bootstrapInfo.interceptAll();
    }

    setupUserInfoIntercept(){
        this.userInfo.interceptAll(HttpMethods.GET)
    }
    awaitAndSaveAuthorization() {
        this.userInfo.getBearer().then((bearer: string)=>{
            this.bearer=bearer.substring(7)            
        })
    }

    removeAllAvailableCourses(){
        let classId;
        let subjectGroupId
        this.getUserInfoField(UserInfoFields.CLASS_ID).then((class_id)=>{
            classId=class_id
        })
        this.bootstrapInfo.waitForRequestAndResponse() 
        this.bootstrapInfo.getResponse().then(response=>{
            if(response.body.data.bootstrap.classInfo.subjects){
                response.body.data.bootstrap.classInfo.subjects.forEach(subject => {
                    subject.subjectGroups.forEach(subjectGroup => {
                        
                        cy.wrap(subjectGroup.subjectGroupId).then((subject_group_id)=>{
                            subjectGroupId=subject_group_id
                            this.lessonPlan.deleteSubject(classId,subjectGroupId)
                            cy.reload();
                        })                        
                    });
                });
            }
        })    
    }    

    getUserInfoField(field: UserInfoFields){
        return this.userInfo.getField(field)
    }
}