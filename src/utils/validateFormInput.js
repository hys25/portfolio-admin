export function validate(requiredFields, formDataValue) {
  const errors = {}
  requiredFields.forEach((requiredField) => {
    if (!formDataValue[requiredField]) {
      errors[requiredField] = `${requiredField
        .toUpperCase()
        .replace("_", " ")} is required`
    }
  })
  return errors
}
