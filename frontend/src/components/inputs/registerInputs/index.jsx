import { ErrorMessage, useField } from "formik";
import "./style.css";
import { useMediaQuery } from 'react-responsive'
const RegisterInputs = ({ placeholder, bottom, ...props }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 850px)'
  })
  const [field, meta] = useField(props);
 
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className={`${isDesktopOrLaptop?"input_error input_error_desktop":"input_error"}`} style={{transform:"translateY(4px)"}}>
          {
            // Show error message if the field has been touched and error exists
            meta.touched && meta.error && <ErrorMessage name={field.name} />
           
          }
          {
             meta.touched && meta.error &&( <div className={`${isDesktopOrLaptop?"error_arrow_desktop_right":"error_arrow_top"}`}></div>)
          }
        </div>
      )}
      <input
        className={` ${meta.touched && meta.error ? "input_error_border" : ""}`}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && bottom && (
        <div className={`${isDesktopOrLaptop?"input_error input_error_desktop":"input_error"}`} style={{transform:"translateY(1px)"}}>
          {
            // Show error message if the field has been touched and error exists
            meta.touched && meta.error && <ErrorMessage name={field.name} />
          }
          {
             meta.touched && meta.error &&( <div className={`${isDesktopOrLaptop?"error_arrow_desktop_right":"error_arrow_bottom"}`}></div>)
          }
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !isDesktopOrLaptop ? "63%" : "15px"}` }}
        ></i>
      )}
    </div>
  );
};

export default RegisterInputs;
