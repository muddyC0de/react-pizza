import ContentLoader from "react-content-loader";

const ImgSkeleton = () => (
  <ContentLoader
    speed={5}
    width={275}
    height={260}
    viewBox="0 0 275 275"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="136" r="137" />
  </ContentLoader>
);

export default ImgSkeleton;
