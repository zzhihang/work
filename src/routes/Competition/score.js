/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 21:41
 */
import React from 'react';
import {Form, Input, message} from "antd";
import {connect} from "dva";
import {equalResultStatus} from "../../utils";
import {saveScore} from "../../services/competition";
import {routerRedux} from 'dva/router';
import qs from "qs";


const List = [{
  title: '产品与服务',
  field: 'service',
  total: 35
},{
  title: '项目概况',
  field: 'generalization',
  total: 15
}, {
  title: '市场分析',
  field: 'marketAnalysis',
  total: 20
}, {
  title: '营销策略',
  field: 'marketingStrategy',
  total: 5
}, {
  title: '风险分析与控制',
  field: 'riskAnalysis',
  total: 10
}, {
  title: '项目三年规划',
  field: 'plan',
  total: 5
}, {
  title: '项目资金筹措与使用',
  field: 'financing',
  total: 5
}, {
  title: '项目财务分析',
  field: 'financialAnalysis',
  total: 5
}, {
  title: '网站介绍',
  field: 'webIntro',
}, {
  title: '组织结构',
  field: 'organizationStructure',
}, {
  title: '其他',
  field: 'other',
}];

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    }
  }

  submit = () => {
    const {form, history, location, dispatch} = this.props;
    const {validateFieldsAndScroll} = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = values;
        const locationParams = qs.parse(location.search.split('?')[1]);
        params.token = sessionStorage.getItem('token');
        params.teamId = locationParams.teamId;
        params.service = this.state.total;
        if(Number(params.service) > 100 || Number(params.service) <= 0){
          return message.error('评分在0-100之间！')
        }
        saveScore(values).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('评分成功！');
            dispatch(routerRedux.push({
                pathname: '/home/match'
            }))

          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  componentWillMount() {
    const {location} = this.props;
    const params = qs.parse(location.search.split('?')[1]);
    this.setState({
      total: params.service
    })
  }

  handleChange = () => {
    const {form} = this.props;
    const scores = form.getFieldsValue();
    let total = 0;
    Object.keys(scores).forEach((item) => {
      total += Number(scores[item] || 0) || 0;
    });
    total = total / 11;
    total = Number(total).toFixed(3);
    this.setState({total});
  };

  handleTotalChange = (e) => {
    this.setState({
      total: e.currentTarget.value
    })
  };

  checkScore = (rule, value, callback) => {
    if (Number(value) > 100 || Number(value) < 0 ) {
      callback('分数在0-100之间');
      return;
    }
    callback();
  };


  render() {
    const {form, location} = this.props;
    const params = qs.parse(location.search.split('?')[1]);
    const {getFieldDecorator} = form;
    return (
      <div className="second-bg pt40">
        <div className='w'>
          <div className="pb60 score mb80 ">
            <div className="top">
              <h1>{params.matchName}</h1>
              <h2>项目名称：{params.projectName}</h2>
            </div>
            {List.map((item, index) => {
              return (
                <div className="score-card" key={index}>
                  <h4>{item.title}</h4>
                  <p className='content'>
                    {params.project[item.field]}
                  </p>
                  <div className="bottom">
                    {item.total ? <span className='pingfen'>此项得分满分为{item.total}分</span> : <span className='pingfen'>此项不参与评分</span>}
                    {/*<Form.Item style={{marginTop: 40}}>*/}
                    {/*{getFieldDecorator(item.field, {*/}
                      {/*rules: [{required: true, message: '请填写必填项'}, {*/}
                        {/*validator: this.checkScore,*/}
                      {/*}],*/}
                      {/*initialValue: params[item.field],*/}
                      {/*getValueFromEvent: (event) => {*/}
                        {/*return event.target.value.replace(/\D/g, '')*/}
                      {/*},*/}
                      {/*trigger: 'onInput'*/}
                    {/*})(*/}
                      {/*<Input onChange={this.handleChange}/>*/}
                    {/*)}*/}
                    {/*</Form.Item>*/}
                  </div>
                </div>
              )
            })}
            <div className="height12line mt50"/>
            <div className="total-score">
              <div className="score-form" style={{borderRadius: 4}}>
                <div className="bottom" style={{height: 'auto'}}>
                  <div className="pingfen">总分</div>
                  <Input value={this.state.total} onChange={this.handleTotalChange}/>
                </div>
                <div className="bottom" style={{height: 'auto', marginTop: 40}}>
                  <div className="pingfen" style={{alignSelf: 'flex-start'}}>评价</div>
                  <Form.Item style={{width: "100%"}}>
                  {getFieldDecorator('evaluation', {
                    rules: [{required: true, message: '请填写评价!'}],
                    initialValue: params['evaluation'] || '',
                  })(
                    <Input.TextArea style={{height: 275}}/>
                  )}
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="text-align">
              <div className="main-button" style={{width: 600}} onClick={this.submit}>提交</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}


export default connect(({competition}) => competition)(Form.create()(Score));
