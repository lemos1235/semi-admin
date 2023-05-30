type Props = {
  message: string;
  description?: string;
};

function PageLoading({}: Props) {
  return <div>PageLoading</div>;
}

PageLoading.defaultProps = {
  message: "正在加载中~",
};

export default PageLoading;
