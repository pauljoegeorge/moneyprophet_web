const isNumber = (value) => (Number(value) >= 0 ? undefined : "Required");

export const useValidations = () => {
  const number = (value) => isNumber(value);

  return {
    number,
  };
};
