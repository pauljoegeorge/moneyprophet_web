import React from "react";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FlexContainer, FlexChild } from "./Div";
import CategoryIcon from "./CategoryIcon";

const selectSx = {
  borderRadius: "var(--radius-md)",
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontSize: "0.875rem",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--border)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--ring)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--ring)",
    borderWidth: "2px",
  },
  backgroundColor: "var(--card)",
  color: "var(--foreground)",
};

const labelSx = {
  fontFamily: '"IBM Plex Sans", sans-serif',
  fontSize: "0.875rem",
  color: "var(--muted-foreground)",
  textAlign: "left",
  paddingLeft: "2px",
  "&.Mui-focused": { color: "var(--ring)" },
};

function InputSelect({ input, label, options, isMultiLabeled }) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={input.name}
          style={{
            display: "block",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
            marginBottom: "6px",
            textAlign: "left",
            paddingLeft: "2px",
          }}
        >
          {label}
        </label>
      )}
      <FormControl fullWidth>
        <Select
          id={input.name}
          inputProps={{ "aria-label": label || input.name }}
          MenuProps={{
            container: () =>
              document.querySelector(".money-workspace") || document.body,
          }}
          value={input.value}
          onChange={input.onChange}
          sx={{
            ...selectSx,
            height: "2.25rem", // Matches h-9 (36px) of Input component
          }}
        >
          {isMultiLabeled
            ? options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <FlexContainer align="flex-start" width="100%">
                    <FlexChild align="left" width="100%">
                      {option.label[0]}
                    </FlexChild>
                    <FlexChild>{option.label[1]}</FlexChild>
                  </FlexContainer>
                </MenuItem>
              ))
            : options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    fontSize: "0.875rem",
                    fontFamily: '"IBM Plex Sans", sans-serif',
                  }}
                >
                  <span className="category-with-icon">
                    {Object.prototype.hasOwnProperty.call(option, "icon") && (
                      <CategoryIcon name={option.icon} />
                    )}
                    {option.label}
                  </span>
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );
}

InputSelect.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  }).isRequired,
  label: PropTypes.string.isRequired,
  isMultiLabeled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      icon: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
        .isRequired,
    }),
  ).isRequired,
};

InputSelect.defaultProps = {
  isMultiLabeled: false,
};

export default InputSelect;
