import React, { Component } from "react";
import { connect, PromiseState } from "react-refetch";
import { Card, Row, Col } from "antd";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      services: []
    };
  }
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.services();
      this.setState({ services: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  services() {
    return true;
  }

  render() {
    const { getServices } = this.props;
    if (getServices.pending) {
      return <Card />;
    } else if (getServices.rejected) {
      return <Card>{getServices.reason}</Card>;
    }

    return (
      <Card>
        <Row>
          <Col span={8}>
            <h3>Service Name</h3>
          </Col>
          <Col span={8}>
            <h3>Owner</h3>
          </Col>
          <Col span={8}>
            <h3>Description</h3>
          </Col>
        </Row>
        {getServices.value.services.map(s => {
          return (
            <Row>
              <Col span={8}>{s.name}</Col>
              <Col span={8}>{s.owner.name}</Col>
              <Col span={8}>{s.description}</Col>
            </Row>
          );
        })}
      </Card>
    );
  }
}

export default connect(props => ({
  getServices: `http://localhost:6001/services`
}))(Home);
