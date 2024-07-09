const GenderSelect = ({ handleChange, genderError }) => {
  return (
    <div className="register_grid  relative">
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value={"male"}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value={"female"}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value={"custom"}
          onChange={handleChange}
        />
      </label>
      {genderError !== "" && (
  <div className="absolute w-full flex items-center justify-center mt-2">
    <div className="bg-[#b94a48] text-[#fff] text-[13px] p-2 rounded-md absolute min-h-16 top-9 w-full flex items-center justify-center z-10">
      <span className="absolute -top-2 left-6 transform -translate-x-1/2 w-0 h-0 border-b-8 border-b-[#b94a48] border-l-8 border-l-transparent border-r-8 border-r-transparent"></span>
      {genderError}
    </div>
  </div>
)}

      
    </div>
  );
};

export default GenderSelect;
