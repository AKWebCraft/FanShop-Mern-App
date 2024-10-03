import React from "react";
import styles from "./TextInput.module.css";

function Textinput(props) {
  return (
    <div className={styles.textInputWrapper}>
      <input {...props} />
      {props.error && (
        <p className={styles.errorMessage}>{props.errormessage}</p>
      )}
    </div>
  );
}

export default Textinput;
