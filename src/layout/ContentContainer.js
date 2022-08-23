function ContentContainer({ ...props }) {
  return (
    <div className="flex flex-col px-10 mx-auto w-full max-w-[1240px]">
      {props.children}
    </div>
  )
}
export default ContentContainer
