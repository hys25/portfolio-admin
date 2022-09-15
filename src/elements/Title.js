export function Title({ className, children, ...props }) {
  return (
    <p
      className={`text-14 text-grey uppercase font-bold ${className}`}
      {...props}
    >
      {children}
    </p>
  )
}
