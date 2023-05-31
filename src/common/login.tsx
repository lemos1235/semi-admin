import { Form, Button, Card } from "@douyinfe/semi-ui";
import { useState } from "react";
import { login } from "@src/api/auth";
import { Toast } from '@douyinfe/semi-ui';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/context/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values: any) {
    setLoading(true);
    const { code, msg, data } = await login(values);
    if (code === 200) {
      auth.signin(data);
      Toast.success("登录成功！")
      navigate("/")
    } else {
      Toast.error(msg);
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card shadows="always" style={{ width: 308, cursor: "auto" }}>
        <div className="w-full text-lg text-center font-bold my-4 text-[#303133]">登录</div>
        <Form
          initValues={{
            username: "jojo",
            password: "aa123456",
          }}
          onSubmit={onSubmit}
        >
          <Form.Input field="username" noLabel placeholder="用户名" />
          <Form.Input field="password" noLabel type="password" placeholder="密码" />
          <div className="pb-2 pt-2">
            <Button theme="solid" type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
