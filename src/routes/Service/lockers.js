/**
 * @Description: 储物柜申请
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Form, message, Row} from "antd";
import {equalResultStatus} from "../../utils";
import Const from '../../utils/Const';
import {serviceLockerAppli, serviceQueryLockers} from "../../services/service";
import BackButton from "../../components/BackButton/BackButton";
import Radio from "antd/es/radio";


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
        <div className="w bg-white br6 mt39 mb80 pb60 pt60 form-bl">
          <Form>
            <Form.Item
              label="选择储物柜"
              labelCol={{span: 8}}
              wrapperCol={{span: 8}}
              colon={false}
            >
            {getFieldDecorator('locker', Const.RULE)(
              <Radio.Group className='bl-label'>
                {list.map((item, index) => <Radio key={index} value={item.id}>{item.name}</Radio>)}
              </Radio.Group>
            )}
            </Form.Item>
          </Form>
          <Row type='flex' justify='space-around'>
            <BackButton text='取消'/>
            <div className='main-button' onClick={submit}>提交</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(Lockers);
