import React from "react";

const CheckBox = props => {
  return (
    <div className="form-group">
      <label for={props.name} className="form-label">
        {props.title}
      </label>
      <div className="checkbox">
        <label key={props.name} className="checkbox-inline">
          <input
            id={props.name}
            name={props.name}
            onChange={props.handleChange}
            value={props.value}
            checked={props.checked}
            type="checkbox"
          />{" "}
          {props.value}
        </label>
      </div>
    </div>
  );
};

export default CheckBox;
