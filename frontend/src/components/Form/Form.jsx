import React from "react";
import styles from "./Form.module.css";

function Form({ handleSubmit, name, setName }) {
  return (
    <div className={styles.container}>
      <div className={`mb-3 ${styles.box}`}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className={styles.Button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
