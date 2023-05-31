import { set } from "lodash-es";
import { ComponentType, FC, Suspense, lazy } from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import PageLoading from "@components/page-loading";

function generatePathConfig(): Record<string, any> {
  const modules = import.meta.glob([
    "/src/pages/**/*.{ts,tsx}",
    "!/src/pages/**/components**",
  ]);
  const pathConfig = {};
  Object.keys(modules).forEach(filePath => {
    const routePath = filePath
      .replace("/src/pages/", "")
      .replace(/.tsx?/, "")
      .replace(/\[([\w-]+)]/, ":$1")
      .replace(/([\w-]+)/, "$1")
      .split("/");
    // 使用 lodash.set 合并为一个对象
    const filteredPath = routePath.filter(p => (!p.startsWith(".") && !p.startsWith("_")) || p.startsWith("_layout"));
    set(pathConfig, filteredPath, modules[filePath]);
  });
  return pathConfig;
}

function wrapSuspense(importer: () => Promise<{ default: ComponentType }>) {
  if (!importer) {
    return undefined;
  }
  // 使用 React.lazy 包裹 () => import() 语法
  const Component = lazy(importer);
  // 结合 Suspense，这里可以自定义 loading 组件
  return (
    <Suspense fallback={<PageLoading message="正在加载中" />}>
      <Component />
    </Suspense>
  );
}

/**
 * 将文件路径配置映射为 react-router 路由
 */
function mapPathConfigToRoute(cfg: Record<string, any>): RouteObject[] {
  // route 的子节点为数组
  return Object.entries(cfg).map(([routePath, child]) => {
    // () => import() 语法判断
    if (typeof child === "function") {
      // 等于 index 则映射为当前根路由
      const isIndex = routePath === "index";
      return {
        index: isIndex,
        path: isIndex ? undefined : routePath,
        // 转换为组件
        element: wrapSuspense(child),
      };
    }
    // 否则为目录，则查找下一层级
    const { _layout, ...rest } = child;

    return {
      path: routePath,
      // layout 处理
      element: wrapSuspense(_layout),
      // 递归 children
      children: mapPathConfigToRoute(rest),
    };
  });
}

function generateRouteConfig(): RouteObject[] {
  const { _layout, ...pathConfig } = generatePathConfig();
  return [
    {
      path: "/",
      element: wrapSuspense(_layout),
      children: mapPathConfigToRoute(pathConfig),
    },
  ];
}

const mainRoutes = generateRouteConfig();

const publicRoutes: RouteObject[] = [
  {
    path: "login",
    element: wrapSuspense(() => import("@src/common/login")),
  },
  {
    path: "/403",
    element: wrapSuspense(() => import("@src/common/403")),
  },
  {
    path: "*",
    element: wrapSuspense(() => import("@src/common/404")),
  },
];

const PageRoutes: FC = () => {
  return useRoutes([...mainRoutes, ...publicRoutes]);
};

export { mainRoutes };

export default PageRoutes;
