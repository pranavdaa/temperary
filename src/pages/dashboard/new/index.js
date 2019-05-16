import React from "react" 
import { Button ,Card  } from 'antd';
import { Form, Select, Input} from 'antd';
const { Option } = Select;
class Adder extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // handleSelectChange = value => {
  //   console.log(value);
  //   this.props.form.setFieldsValue({
  //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
  //   });
  // };

  render(){
      const { getFieldDecorator } = this.props.form;
        return(
      <div>
        <Card >
        <h3 className="text-center mb-5">Provide Course Detail</h3>
    <div className="card-body">
    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
    <Form.Item label="Select Year:">
          {getFieldDecorator('year', {
            rules: [{ required: true, message: 'Please select your gender!' }],
          })(
            <Select
              placeholder="Select Year"
              // onChange={this.handleSelectChange}
            >
              <Option value="20019">2019</Option>
              <Option value="2020">2020</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Course Name:">
          {getFieldDecorator('pcn', {
            rules: [{ required: true, message: 'Please enter Course Name!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Batch Info:">
          {getFieldDecorator('pbi', {
            rules: [{ required: true, message: 'Please enter Batch info!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
</div>
        </Card>
        </div>
        )
    }
}

export default Form.create({ name: 'dynamic_rule' })(Adder) ;

