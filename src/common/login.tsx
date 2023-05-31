import { Form, Button, Row, Card } from '@douyinfe/semi-ui';
import { useState } from 'react';

interface LoginRequest {
  username: string;
  password: string;
}
export default function login() {

  const [loading, setLoading] = useState(false);

  async function onSubmit(values: LoginRequest) {
    setLoading(true);
    console.log(values);

    setLoading(false);
  }

  return <div style={{
    paddingTop: 200,
    height: '100%',
  }}>
    <Row type="flex" justify="center">
      <Card
        shadows='always'
        style={{ width: 360, cursor: "auto" }}
        footerLine
        header={
          <h2 style={{ width: '100%', textAlign: 'center', color: 'var(--semi-color-text-2)' }}>Xxxx管理后台</h2>
        }
      >
        <Form initValues={{
          username: 'lisi',
          password: ['abc123']
        }} onSubmit={onSubmit}>
          <Form.Input field='username' label='用户名'  />
          <Form.Input field='password' type='password' label='密码' />
          <Button theme='solid' type="primary" htmlType="submit" loading={loading} block>登录</Button>
        </Form>
      </Card>
    </Row>
  </div>;
}
