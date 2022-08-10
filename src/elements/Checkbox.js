export function Checkbox({
  className = "",
  name,
  value,
  checked,
  onChange,
  containerClassName = "",
  rounded = false,
}) {
  return (
    <div
      onClick={onChange}
      className={`flex items-center group cursor-pointer ${containerClassName}`}
    >
      <div className="relative w-6 h-6 min-w-[24px]">
        <input
          id="check-box-1"
          type="checkbox"
          className={`appearance-none checked:border-peacockBlue cursor-pointer group-hover:border-peacockBlue border border-grey w-6 h-6 z-40 absolute ${className} ${
            rounded ? "rounded" : ""
          }`}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`w-[18px] h-[18px] top-[3px] left-[3px] hidden absolute bg-lightBlue ${
            rounded ? "rounded" : ""
          }`}
        />
      </div>
      <p
        style={{ lineHeight: "1.43" }}
        className={`text-marine group-hover:font-bold text-sm ml-2 text-white ${
          checked ? "font-bold" : ""
        }`}
      >
        {name}
      </p>
    </div>
  );
}
