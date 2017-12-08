import React, { Component } from "react";
import { Form, Input, Button, Card, Select } from "antd";
import { connect, PromiseState } from "react-refetch";

const FormItem = Form.Item;
const Option = Select.Option;

class CreateService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    };
  }

  validateForm() {
    return true;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.postService({ service: values, team: values.team });
        //todo redirect on success
      }
    });
  };

  // handleSubmit = async event => {
  //   this.props.postService({});
  //   event.preventDefault();

  //   this.setState({ isLoading: true });

  //   try {
  //     await this.createNote({
  //       content: this.state.content
  //     });
  //     this.props.history.push("/");
  //   } catch (e) {
  //     alert(e);
  //     this.setState({ isLoading: false });
  //   }
  // };

  //   createNote(note) {
  //     return invokeApig({
  //       path: "/notes",
  //       method: "POST",
  //       body: note
  //     });
  //   }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 }
    };
    const tailFormItemLayout = {
      wrapperCol: { span: 12, offset: 5 }
    };
    const { getFieldDecorator } = this.props.form;
    const { getTeams } = this.props;
    if (getTeams.pending) {
      return <Card />;
    } else if (getTeams.rejected) {
      return <Card>{getTeams.reason}</Card>;
    }

    return (
      <Card>
        <Form onSubmit={this.handleSubmit} layout="horizontal">
          <FormItem {...formItemLayout} label="Service Name">
            {getFieldDecorator("name", {
              rules: [
                { required: true, message: "Please enter a service name" }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Select">
            {getFieldDecorator("team", {
              rules: [{ required: true, message: "Please select your team!" }]
            })(
              <Select placeholder="Please select your team">
                {getTeams.value.teams.map(t => {
                  return <Option key={t.name}>{t.name}</Option>;
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator("description", {})(<Input />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default connect(props => ({
  postService: service => ({
    postServiceResponse: {
      url: `http://localhost:6001/services`,
      method: "POST",
      body: JSON.stringify(service)
    }
  }),
  getTeams: `http://localhost:6001/teams`
}))(Form.create()(CreateService));
