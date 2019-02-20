/**
 * @Description: 预约参观
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {
  Form, Input, Row, Col, DatePicker, message
} from 'antd';
import BackButton from "../../components/BackButton/BackButton";
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import {reservationPark} from "../../services/service";

const {TextArea} = Input;

const rule = {
  rules: [{ required: true, message: '此处为必填项!' }],
};

const TeamInfoWrite = ({form, history, location}) => {
  const {getFieldDecorator, validateFields} = form;
  const submit = () => {
    validateFields((err, values) => {
      if (!err) {
        let params = values;
        params.token = sessionStorage.getItem('token');
        params.mId = getParams(location.search).mId;
        values.busiDate = values.busiDate.format('YYYY-MM-DD HH:mm:ss');
        reservationPark(values).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('预约成功！');
            history.push({
              pathname: '/index',
            });
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  return (
    <div style={{background: '#FAFAFA', paddingBottom: 60}}>
      <div className='w mt39 bg-white pb80'>
        <div className='bl-form'>
          <div className='form-title'>预约参观</div>
          <div className="form-content">
            <Form>
              <Row gutter={138}>
                <Col span={12}>
                  <Form.Item
                    label="姓名"
                  >
                    {getFieldDecorator('name', rule)(
                      <Input placeholder='请输入姓名'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="联系方式"
                  >
                    {getFieldDecorator('phone', rule)(
                      <Input placeholder='请输入联系方式'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="日期"
                  >
                    {getFieldDecorator('busiDate', rule)(
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="人数"
                  >
                    {getFieldDecorator('count', rule)(
                      <Input placeholder='请输入参观人数'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="来源"
                  >
                    {getFieldDecorator('resource', rule)(
                      <Input placeholder='请输入来源'/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="参观理由"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('reason', rule)(
                  <TextArea placeholder='请输入参观理由...' style={{height: 240}}/>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <Row type='flex' justify='space-around' gutter={360}>
          <BackButton text='取消'/>
          <div className='main-button' onClick={submit}>提交</div>
        </Row>
      </div>
    </div>
  );
};

export default Form.create()(TeamInfoWrite);