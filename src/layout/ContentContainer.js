function ContentContainer({ ...props }) {
  return (
    <div className="w-full max-w-[1240px] flex flex-col mx-auto px-10">
      {props.children}
    </div>
  );
}
export default ContentContainer;
