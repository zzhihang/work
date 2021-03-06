/**
 * @Description: 园区入驻第3步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Form, message, Row} from 'antd';
import {equalResultStatus, getParams} from "../../utils";
import {parkResidentTeam} from "../../services/park";
import TeamInfo from "../../components/TeamInfo/TeamInfo";
import qs from "qs";


class ParkStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  submit = () => {
    const {history, location} = this.props;
    const params = this.ref.getTeamInfoData();
    if (!Object.keys(params).length) {
      return message.error('请填写必填项！');
    }
    const principalStr = [];
    const array = Object.keys(params);
    array.forEach((item) => {
      if(item !== 'membersStr'){
        principalStr.push(params[item]);
      }
    });
    let formData = new FormData();
    const subData = qs.parse(location.search.split('?')[1]);
    subData.token = sessionStorage.getItem('token');
    subData.principalStr = principalStr.join(',');
    subData.membersStr = params.membersStr;
    Object.keys(subData).forEach((item) => {
      formData.append(item, subData[item]);
    });
    parkResidentTeam(formData).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('入驻申请提交成功，请等待后台审核');
        history.push('/index');
      } else {
        message.error(data.message);
      }
    })
  };

  render() {
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>填写公司与项目信息</div>
            <div className="text-align mt40">
              <span className="form-name">团队情况</span>
            </div>
            <TeamInfo wrappedComponentRef={(form) => this.ref = form}/>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>提交</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(ParkStep3);
