import React, { useState } from 'react';
import '../assets/style.css'

const DateDifference = () => {
  const [date1, setDate1] = useState('03/19/2021');
  const [date2, setDate2] = useState('03/31/2021');
  const [days, setDays] = useState(0);

  const handleCalculate = () => {
    const startDay = new Date(date1);
    const endDay = new Date(date2);
    const millisBetween = startDay.getTime() - endDay.getTime();
    const days = millisBetween / (1000 * 3600 * 24);
    setDays(Math.round(Math.abs(days)));
  };

  return (
    <div className="container question-04">
      <h1>Jquery example to get number of days between two dates</h1>
      <div>
        <label htmlFor="date1">First date: </label>
        <input type="text" id="date1" value={date1} onChange={(e) => setDate1(e.target.value)} />
      </div>
      <div>
        <label htmlFor="date2">Second date: </label>
        <input type="text" id="date2" value={date2} onChange={(e) => setDate2(e.target.value)} />
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      <div>
        {days > 0 && <p>Number of days between two dates: {days}</p>}
      </div>
    </div>
  );
};

export default DateDifference;
