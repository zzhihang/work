/**
 * @Description: 储物柜申请
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Form, message, Row} from "antd";
import {equalResultStatus} from "../../utils";
import {serviceLockerAppli, serviceQueryLockers} from "../../services/service";
import BackButton from "../../components/BackButton/BackButton";
import Radio from "antd/es/radio";
import {cloneDeep} from "lodash";


class Lockers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    serviceQueryLockers().then(({data}) => {
      if(equalResultStatus(data)){
        this.setState({
          list: data.data
        })
      }else{
        message.error(data.message);
      }
    });
  }

  render(){
    const {form, history} = this.props;
    const {list} = this.state;
    const {getFieldDecorator} = form;

    const submit = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          values.token = sessionStorage.getItem('token');
          if(!values.locker){
            return message.error('请选择储物柜');
          }
          values.locker = values.locker[0];
          serviceLockerAppli(values).then(({data}) => {
            if (equalResultStatus(data)) {
              message.success('申请成功');
              history.push({
                pathname: '/service',
              });
            } else {
              message.error(data.message);
            }
          });
        }
      });
    };

    return (
      <div className='second-bg'>
        <div className="w form-bl service-form-wrapper">
          <Form>
            <Form.Item
              label="选择储物柜"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              colon={false}
            >
            {getFieldDecorator('locker')(
              <Radio.Group className='bl-label'>
                {list.map((item, index) => <Radio key={index} value={item.id} disabled={String(item.available) !== '1'}>{item.name}</Radio>)}
              </Radio.Group>
            )}
            </Form.Item>
          </Form>
          <Row type='flex' justify='space-around'>
            <BackButton />
            <div className='main-button' onClick={submit}>提交</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(Lockers);
