import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import classes from "./CheckoutForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 6;

const CheckoutForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalcode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalcode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalcode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameInputClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const streetInputClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;

  const cityInputClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  const postalcodeInputClasses = `${classes.control} ${
    formInputsValidity.postalcode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name"></input>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street"></input>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalcodeInputClasses}>
        <label htmlFor="postalcode">Postal Code</label>
        <input ref={postalCodeInputRef} type="text" id="postalcode"></input>
        {!formInputsValidity.postalcode && (
          <p>Please enter a valid Postal Code! (5 characters required.)</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city"></input>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
