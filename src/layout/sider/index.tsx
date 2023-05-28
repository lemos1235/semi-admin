import { IconActivity, IconSemiLogo, IconSetting, IconUser } from "@douyinfe/semi-icons";
import { Layout, Nav } from "@douyinfe/semi-ui";
import { NavItems, OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation";
import { mainRoutes } from "@src/router";
import { useMemo, useState } from "react";
import { Link, RouteObject } from "react-router-dom";

const { Sider } = Layout;

export default function SideBar() {
  const onSelect: (data: OnSelectedData) => void = data => {
    setSelectedKeys([...data.selectedKeys]);
  };

  const [selectedKeys, setSelectedKeys] = useState([] as any);

  const flatRoutes: (routes: RouteObject[]) => any = routes => {
    function flat(x: RouteObject, path?: string, z: Record<string, RouteObject> = {}) {
      const _path = path != undefined && x.path != undefined ? path + x.path : path != undefined ? path : x.path;
      if (x.children) {
        x.children.forEach(child => flat(child, _path, z));
      } else if (_path) {
        z[_path] = { ...x, path: _path };
      }
      return z;
    }
    let m: Record<string, RouteObject> = {};
    routes.forEach(route => {
      m = { ...m, ...flat(route) };
    });
    return m;
  };

  const flattedRoutes = flatRoutes(mainRoutes);

  const menuList: NavItems = useMemo(
    () => [
      {
        itemKey: "/dashboard",
        text: "Dashboard",
        icon: <IconActivity />,
      },
      {
        itemKey: "/user",
        text: "用户管理",
        icon: <IconUser />,
      },
      {
        itemKey: "/setting",
        text: "系统设置",
        icon: <IconSetting />,
      },
    ],
    []
  );

  return (
    <Sider>
      <Nav
        header={{
          logo: <IconSemiLogo style={{ height: "36px", fontSize: 36 }} />,
          text: "Semi 运营后台",
        }}
        renderWrapper={({ itemElement, props }) => {
          if (props.itemKey) {
            const route = flattedRoutes[props.itemKey];
            if (route) {
              return (
                <Link style={{ textDecoration: "none" }} to={route.path}>
                  {itemElement}
                </Link>
              );
            }
          }
        }}
        items={menuList}
        style={{ height: "100%" }}
        bodyStyle={{ height: "100%" }}
        // defaultOpenKeys={[""]}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
        footer={{
          collapseButton: true,
        }}
      />
    </Sider>
  );
}
