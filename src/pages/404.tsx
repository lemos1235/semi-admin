import Empty from "@src/components/empty";
import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return <Empty title="找不到咯" description="这里什么也没有~" type="404" />;
}
