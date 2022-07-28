import React, { useEffect, useRef, useState } from "react";

import { useField } from "@unform/core";

import InputMask from "react-input-mask";

import { TextInput, Wrapper, ErrorMessage } from "../styled";

export default function MaskedInput({
  name,
  inputMask,
  width,
  label,
  fieldOnChange,
  ...rest
}) {
  const ref = useRef(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  const [mask, setMask] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: "props.value",
    });
  }, [ref.current, fieldName]);

  const handleMask = (e) => {
    const { value } = e.target;
    return setMask(value);
  };

  return (
    <InputMask
      name={fieldName}
      mask={inputMask}
      formatChars={{
        x: "[0-9]",
      }}
      value={mask}
      onChange={(e) => handleMask(e)}
      ref={ref}
    >
      {(inputProps) => (
        <Wrapper width={width}>
          <label htmlFor={fieldName}>{label}</label>
          <TextInput {...inputProps} />
        </Wrapper>
      )}
    </InputMask>
  );
}
