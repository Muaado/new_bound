import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const PhoneInput_ = (props) => {
  console.log("PROPS", props);
  return <PhoneInput {...props} />;
};
export default PhoneInput_;
