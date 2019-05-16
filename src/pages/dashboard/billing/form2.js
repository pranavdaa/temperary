import { Form, Select, Input, Button } from 'antd';
import React from 'react';
const { Option } = Select;

class App extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

//   handleSelectChange = value => {
//     console.log(value);
//     this.props.form.setFieldsValue({
//       note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
//     });
//   };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              <Form.Item label="Month">
          {getFieldDecorator('month', {
            rules: [{ required: true, message: 'Please select the month!' }],
          })(
            <Select
              placeholder="January"
            //   onChange={this.handleSelectChange}
            >
              <Option value="January">January</Option>
              <Option value="February">February</Option>
              <Option value="March">March</Option>
              <Option value="April">April</Option>
              <Option value="May">May</Option>
              <Option value="June">June</Option>
              <Option value="July">July</Option>
              <Option value="August">August</Option>
              <Option value="September">September</Option>
              <Option value="October">October</Option>
              <Option value="November">November</Option>
              <Option value="December">December</Option>


            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Payed Bill Amount:">
          {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your due bill' }],
          })(<Input />)}
        </Form.Item>
 
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Download Invoice
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp2 = Form.create({ name: 'coordinated' })(App);

export default WrappedApp2;
