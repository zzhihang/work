import {Col, DatePicker, Form, Input, Modal, Radio, Row} from "antd";
import React from "react";
import ComboBox from "../../../../components/ComboBox";
import Const from "../../../../utils/Const";

const list1 = [{
  label: '姓名',
  field: 'name'
}, {
  label: '性别',
  field: 'gendar',
  type: 'radio',
  options: Const.GENDAR_OPTIONS
}, {
  label: '所在院校',
  field: 'studySchool'
}, {
  label: '所学专业',
  field: 'studyProfession'
},{
  label: '毕业时间',
  field: 'studyDate',
  type: 'datepicker'
}, {
  label: '学历',
  field: 'studyEdu'
}, {
  label: '联系电话',
  field: 'phone',
},{
  label: '宗教信仰',
  field: 'faith',
}, {
  label: '政治面貌',
  field: 'politicalStatus',
},];


const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
  colon: false
};

@Form.create()
class Step3Modal extends React.Component{
  handleOk = () => {
    const { onOk, form, itemKey } = this.props;
    const { validateFieldsAndScroll, getFieldsValue } = form;
    validateFieldsAndScroll(errors => {
      if (errors) {
        return
      }
      const data = getFieldsValue();
      data.itemKey = itemKey;
      onOk(data)
    })
  };
  render() {
    const { form, modalItem, ...modalProps} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        title="添加团队成员"
        centered
        width={600}
        {...modalProps}
        onOk={this.handleOk}
      >
        <Form layout='horizontal' className='form-bl'>
          <Row>
            <Col span={24}>
              {list1.map((item, index) => {
                var comp = <Input placeholder={`请输入${item.label}`}/>;
                if (item.type === 'select') {
                  comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''}/>;
                } else if (item.type === 'datepicker') {
                  comp = <DatePicker placeholder={`请选择${item.label}`}/>;
                } else if (item.type === 'radio') {
                  comp =
                    (<Radio.Group>
                      {item.options.map((option, oindex) => <Radio key={oindex}
                                                                   value={option.value}>{option.text}</Radio>)}
                    </Radio.Group>)
                }
                return (
                  <Form.Item
                    label={item.label}
                    key={index}
                    {...formItemLayout}
                  >
                    {getFieldDecorator(`${item.field}`, {
                      initialValue: modalItem[item.field],
                      rules: [{
                        required: true, message: '此处为必填项'
                      }]
                    })(
                      comp
                    )}
                  </Form.Item>
                )
              })}
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Step3Modal;
