import { useId, useState, useEffect } from "react"
import { ReactComponent as PlusIcon } from "../assets/icons/plus-icon.svg"

function UploadFile({
  className = "w-full",
  classNameWrapper,
  onChange,
  children,
  selectedFile,
  previousImage = null,
  error = null,
  ...props
}) {
  const id = useId()
  const [preview, setPreview] = useState(previousImage)
  useEffect(() => {
    if (!selectedFile) {
      return () => {}
    }
    const imageUrl = URL.createObjectURL(selectedFile)
    setPreview(imageUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(imageUrl)
  }, [selectedFile])

  return (
    <div className={`flex flex-col w-1/2 ${classNameWrapper}`}>
      <div className="flex items-center h-[60px] px-[20px] bg-greyDark">
        <input
          id={id}
          type="file"
          onChange={onChange}
          className={`text-[0px] opacity-0 w-0 ${className}`}
          {...props}
        />
        <label
          htmlFor={id}
          className="w-full whitespace-nowrap cursor-pointer leading-[60px] h-[60px] text-grey"
        >
          {children}
        </label>
        <PlusIcon width={12} height={12} />
      </div>
      {preview && <img alt="Project" src={preview} className="mt-[10px]" />}
      {error && <div className="text-error text-12">{error}</div>}
    </div>
  )
}

export default UploadFile
