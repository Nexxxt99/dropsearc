
export const ORGUNIT = [
  {name:"name",type: "java.lang.String",caption:"Наименование"},
  {name:"parentUnit",type: "OrgUnit",caption:"Родительская организация"},
  {name:"code",type: "java.lang.Long",caption:"Код"}]

export const SYSUSER = [
  {name:"login",caption:"Логин",type:"java.lang.String"}, 
  {name:"lastLogonDate",caption:"Дата последнего входа",type:"java.util.Date"}];

export const USER = [
  {name:"fullName",caption:"Полное имя",type:"java.lang.String"}, 
  {name:"orgUnit",caption:"Подразделение",type:"OrgUnint"},
  {name:"birthDate",caption:"Дата рождения",type:"java.util.Date"},
  {name:"systemUser",caption:"Учетная запись",type:"SysUser"}];
  