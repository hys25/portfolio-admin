export function DateAndTime({ date, className }) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return (
    <div className={`w-full text-white ${className}`}>
      <span className="mr-1">{month[new Date(date).getMonth()]}</span>
      {new Date(date).getDate()}, {new Date(date).getFullYear()},
      <span className="ml-1">
        {new Date(date).getHours()}:{new Date(date).getMinutes()}
      </span>
    </div>
  )
}
export default DateAndTime
