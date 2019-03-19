/**
 * @Description: 比赛详情页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:26
 */
import React from 'react';
import ReportCard from "../../components/ReportCard/ReportCard";
import {connect} from "dva";
import {Avatar, Empty} from "antd";
import {Link} from "dva/router";
import qs from "qs";

const Detail = ({data, location, match, history}) => {
  let link = `/competition/${data.id}/team_info_write?mId=${data.id}`;
  let btnName = '报名';
  let allowReport;
  let noTeacher;
  let obKey = 'joinTeams';

  if(String(data.isTutor) === '1'){//当前用户是导师
    allowReport = false;
    link = `${match.url}/score`;
    obKey = `tutorReview`;
    btnName = '查看比赛进度';
    noTeacher = true;
  }else{//当前用户不是导师
    link = `${match.url}/progress${location.search}`;
    if(String(data.joinUser) === '1'){
      btnName = '查看比赛进度';
      noTeacher = true;
    }else{
      allowReport = data.status === '2';
      if(Number(data.status) >= 7){ //网络评审结束状态不允许报名和申请导师
        noTeacher = true;
        allowReport = false;
      }
    }
  }
  if(data.type === '3'){ //其他比赛不允许申请导师 只能报名
    noTeacher = true;
  }


  return (
    <div className='second-bg'>
      <div className="w">
        <ReportCard
          time={data.createTime}
          read={data.pageViews}
          title={data.name}
          content={data.intro}
          mId={data.id}
          reportLink={link}
          btnName={btnName}
          noTeacher={noTeacher}
          img={data.pic}
          allowReport={allowReport}
          history={history}
        />
        <div className='competition-detail' dangerouslySetInnerHTML={{__html: data.content}}/>
        <div className='height6line  mb40'/>
        <div className="sign-member">
          <p>已报名</p>
          <div className="member-box competition-sign-member">
            {
              data[obKey] && data[obKey].length ? data[obKey].map((item, index) => {
                return (
                  <li key={index}>
                    <Avatar size={50} src={item.pic}/>
                    <span>{item.name}</span>
                    {data.isTutor === '1' && Number(data.status) >= 6 && data.type !== '3' &&
                    <Link to={`${link}?${qs.stringify(item)}&matchName=${data.name}`}><span className='dianping'>点评</span></Link>}
                  </li>
                )
              }) : <div className='text-align' style={{width: '100%', paddingBottom: 20}}><Empty/></div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({competition}) => (competition))(Detail);
