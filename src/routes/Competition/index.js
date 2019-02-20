/**
 * @Description: 比赛首页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/27 18:24
 */
import React from 'react';
import {connect} from "dva";
import CompetitionCard from "../../components/CompetitionCard/CompetitionCard";
import config from '../../utils/config';
import {Col, Pagination, Row} from "antd";
import {Link} from "dva/router";

const Index = ({list, count, match}) => {
  const comps = list.map((item, index) =>{
    return (
      <Col span={8} key={index}>
      <Link to={`${match.url}/${item.id}?park=${item.park}`}>
        <CompetitionCard
          key={index}
          img={`${config.URL}${item.pic}`}
          title={item.name}
          time={item.createTime}
          read={item.joinCount}
          status={item.status}
        />
      </Link>
      </Col>
    )
  });
  return (
    <div className='w' style={{marginTop: 40, marginBottom: 80}}>
      <div className='competition'>
        <Row gutter={60}>
        {comps}
        </Row>
      </div>
      <Pagination total={count}/>
    </div>
  );
};


export default connect(({competition}) => (competition))(Index);