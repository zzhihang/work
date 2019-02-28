/**
 * @Description: 个人中心团队信息
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from 'antd';
import {equalResultStatus, reFormatParams} from "../../../utils";
import {parkResidentTeam} from "../../../services/park";
import ComboBox from "../../../components/ComboBox";
import Const from "../../../utils/Const";
import {cloneDeep} from "lodash";
import Modal from './component/step3Modal';


class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      membersStr: [],
      modalItem: {}
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
      modalItem: []
    })
  };


  onCancel = () => {
    this.setState({
      modalVisible: false
    })
  };

  onDel = (e, index) => {
    let membersStr = cloneDeep(this.state.membersStr);
    membersStr.splice(index, 1);
    this.setState({
      membersStr,
      modalVisible: false
    })
  };

  onEdit = (e, index) => {
    let membersStr = cloneDeep(this.state.membersStr);
    this.setState({
      membersStr,
      modalItem: membersStr[index],
      modalVisible: true,
      itemKey: index
    })
  };

  onOk = (data) => {
    let membersStr = cloneDeep(this.state.membersStr);
    if (data.itemKey >= 0) {
      membersStr[data.itemKey] = reFormatParams(data);
    } else {
      membersStr.push(reFormatParams(data));
    }
    this.setState({
      membersStr,
      modalVisible: false
    })
  };

  submit = () => {
    const {form} = this.props;
    const {validateFields} = form;
    const {membersStr} = this.state;
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.id = this.props.teamInfo.id;
        let array = [];
        if (membersStr.length) {
          membersStr.forEach((item) => {
            array.push(item.name + ',' + item.gendar + ','
              + item.studySchool + ',' + item.studyProfession
              + ',' + item.studyDate+ ',' + item.studyEdu+ ',' + item.phone);
          })
        }
        params.membersStr = array.join(';');
        parkResidentTeam(params).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  render() {
    const {initialValueMap={}} = this.props;
    const list1 = [{
      label: '姓名',
      field: 'principalStr',
      initialValue: initialValueMap.principalStr
    }, {
      label: '性别',
      field: 'gendar',
      type: 'radio',
      options: Const.GENDAR_OPTIONS,
      initialValue: initialValueMap.gendar
    }, {
      label: '所在院校',
      field: 'studySchool',
      initialValue: initialValueMap.studySchool
    }, {
      label: '所学专业',
      field: 'studyProfession',
      initialValue: initialValueMap.studyProfession
    }, {
      label: '学历',
      field: 'education',
      initialValue: initialValueMap.education
    },{
      label: '联系电话',
      field: 'phone',
      initialValue: initialValueMap.phone
    }];
    const modalProps = {
      visible: this.state.modalVisible,
      modalItem: this.state.modalItem,
      itemKey: this.state.itemKey,
      onCancel: this.onCancel,
      onOk: this.onOk
    };
    const {modalVisible, membersStr} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w bg-white pb80'>
          <div className='bl-form'>
            <div className="form-content">
              <div className='subheading'>团队成员</div>
              {modalVisible && <Modal {...modalProps}/>}
              <Form>
                <Row gutter={138}>
                  {list1.map((item, index) => {
                    var comp = <Input placeholder={`请输入${item.label}`} initialValue={item.initialValue}/>;
                    if (item.type === 'select') {
                      comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''} initialValue={item.initialValue}/>;
                    } else if (item.type === 'datepicker') {
                      comp = <DatePicker placeholder={`请选择${item.label}`} initialValue={item.initialValue}/>;
                    } else if (item.type === 'radio') {
                      comp =
                        (<Radio.Group>
                          {item.options.map((option, oindex) => <Radio key={oindex}
                                                                       value={option.value} initialValue={item.initialValue}>{option.text}</Radio>)}
                        </Radio.Group>)
                    }
                    return (
                      <Col span={12} key={index}>
                        <Form.Item
                          label={item.label}
                        >
                          {getFieldDecorator(`${item.field}`, Const.RULE)(
                            comp
                          )}
                        </Form.Item>
                      </Col>
                    )
                  })}
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading'>团队成员</label>
                      <span onClick={this.showModal} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {membersStr.map((item, index) => {
                      return (
                        <div className='self-add' key={index}>
                          <span className="item">{item.name}</span>
                          <span className="item">{item.gendar}</span>
                          <span className="item">{item.studySchool}</span>
                          <span className="item">{item.studyProfession}</span>
                          <span className="item">{`${item.studyDate}毕业`}</span>
                          <span className="item">{item.studyEdu}</span>
                          <span className="item">{item.phone}</span>
                          <div className='fr' onClick={(e) => {
                            this.onDel(e, index)
                          }}>
                            <i className="icon-del"/>
                            <span className="edit">删除</span>
                          </div>
                          <i className="split fr"/>
                          <div className='fr' onClick={(e) => {
                            this.onEdit(e, index)
                          }}>
                            <i className="icon-edit"/>
                            <span className="edit">编辑</span>
                          </div>
                        </div>
                      )
                    })}
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>保存</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(Team);
