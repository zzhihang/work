import request from '../../utils/request';
import qs from 'qs';


/**
 * @Description: 请求个人信息
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/2/11 17:06
 */
export function userGetInfo(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/getByToken?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}


export function userUpdateInfo(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/updateByToken?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}



export function userLeavePark(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/leave/save?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
* @Description: 意见反馈
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/21 19:26
*/

export function userFeedBack(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/feedback/save?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
export function userFindEntering(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/findEntering?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
export function userEntering(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/entering?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}

export function userRefuse(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/refuse?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
export function userFindSignActivity(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/activity/findSignActivity?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/** 
* @Description: 用户签到 
* @Param:
* @return:  
* @Author: zzhihang@hotmail.com 
* @date: 2019/2/21 19:28
*/ 

export function userSign(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api/user/sign?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
/**
* @Description: 查询用户签到列表
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/2/21 19:29
*/
export function userSignList(params={}){
  params.token = sessionStorage.getItem('token');
  return request(`/api//user/signList?${qs.stringify(params)}`,{
    method: 'POST',
    headers: new Headers(),
    credentials: "include"
  });
}
