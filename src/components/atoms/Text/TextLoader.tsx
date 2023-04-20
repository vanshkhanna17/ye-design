import ContentLoader from "../../../vendors/ContentLoader.js";

const TEST_UNIQUE_KEY = process.env.JEST_WORKER_ID ? "test" : undefined;

export default function TextLoader({ lines = 1, ...props }: any) {
  const height = 24 * (lines || 1);

  return (
    <ContentLoader
      uniqueKey={TEST_UNIQUE_KEY}
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      {...props}
    >
      {/* Only SVG shapes */}
      {Array.apply(null, { length: lines || 1 }).map((item, index) => (
        <rect
          x="0"
          y={index * 24 + 3}
          width={index ? 100 - Math.pow(8, 3 - (lines - index)) : 100}
          height="20"
          key={index}
        />
      ))}
    </ContentLoader>
  );
}
