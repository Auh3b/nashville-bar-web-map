export default function ImageContainer(props: { url: string }) {
  const { url } = props;
  return (
    <div
      className={`w-full h-48 mb-4 rounded-2xl`}
      style={{ background: `url(${url})` }}></div>
  );
}
