const DateOfBirthSelect = ({
    days,
    bDay,
    bMonth,
    bYear,
    handleChange,
    dateError,
    months,
    years,
  }) => {
    return (
      <div className={`register_grid relative  ${dateError?"mb-16":""}`}>
       
        <select name="bDay" onChange={handleChange} value={bDay}>
          {days?.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select name="bMonth" value={bMonth} onChange={handleChange}>
          {months?.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select name="bYear" value={bYear} onChange={handleChange}>
          {years?.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        {dateError !== "" &&  <div className="absolute w-full flex items-center justify-center mt-2">
    <div className="bg-[#b94a48] text-[#fff] text-[13px] p-2 rounded-md absolute min-h-16 top-9 w-full flex items-center justify-center z-10">
      <span className="absolute -top-2 left-6 transform -translate-x-1/2 w-0 h-0 border-b-8 border-b-[#b94a48] border-l-8 border-l-transparent border-r-8 border-r-transparent"></span>
      {dateError}
    </div>
  </div>}
      </div>
    );
  };
  
  export default DateOfBirthSelect;
  