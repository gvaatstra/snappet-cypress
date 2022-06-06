import { ApiBasePathConfiguration, BaseAccountApiObjectClass, HttpMethods } from "./base-account-api-object-class";

export enum UserInfoFields{
    SUB= 'sub',
    GIVEN_NAME= 'given_name',
    FAMILY_NAME='family_name',
    NICKNAME='nickname',
    NAME='name',
    CLUSTER_ID='cluster_id',
    CLASS_ID='class_id',
    SCHOOL_ID='school_id',
    COUNTRY_ID='country_id',
    GRADE_ID='grade_id',
    ROLE='role',
    PREFERRED_USERNAME='preferred_username',
}

export class UserInfoApi extends BaseAccountApiObjectClass{
    constructor(){
        super(ApiBasePathConfiguration.ACCOUNT_CONNECT,'userinfo', 'UserInfo')
    }

    getField(field: UserInfoFields){
        return super.getResponse(HttpMethods.GET).its(`body.${field}`) 
    }

    getBearer(){
        return super.getRequest(HttpMethods.GET).its('headers.authorization')
    }
}