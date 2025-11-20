interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

const Skeleton = ({ width, height, borderRadius, className }: SkeletonProps) => (
  <div
    className={`skeleton ${className || ""}`}
    style={{
      width: width || "100%",
      height: height || "1em",
      borderRadius: borderRadius || "4px",
    }}
  ></div>
);

export default Skeleton;

