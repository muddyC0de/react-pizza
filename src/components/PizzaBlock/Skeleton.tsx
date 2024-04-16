import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="141" r="125" />
    <rect x="0" y="296" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="348" rx="10" ry="10" width="280" height="88" />
    <rect x="1" y="457" rx="10" ry="10" width="95" height="25" />
    <rect x="129" y="447" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
