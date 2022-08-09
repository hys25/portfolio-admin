function DefaultContainer(props) {
  return (
    <div className="h-screen w-screen flex flex-col pt-5 pb-[70px] px-10 bg-black">
      {props.children}
    </div>
  );
}

export default DefaultContainer;