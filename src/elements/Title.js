export function Title({className, children, ...props}) {
  return (
    <p className={`text-14 text-white ${className}`} {...props}>
      {children}
    </p>
  );
}