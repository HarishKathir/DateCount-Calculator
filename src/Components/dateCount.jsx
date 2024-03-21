import React, { useState } from 'react';
import './datCount.css';

const DateCount = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [addExtraDay, setAddExtraDay] = useState(false);
    const [display, setDisplay] = useState(null);

    const handleCalculation = () => {
        const firstDate = new Date(startDate);
        const lastDate = new Date(endDate);

        if (addExtraDay) {
            lastDate.setDate(lastDate.getDate() + 1);
        }

        if (firstDate.getTime() === lastDate.getTime()) {
            setDisplay(`Start and end dates are the same`);
        } else {
            const timeDifference = lastDate.getTime() - firstDate.getTime();
            const dayDifference = Math.abs(timeDifference / (1000 * 60 * 60 * 24));
            const hourDifference = dayDifference * 24;
            const minuteDifference = hourDifference * 60;
            const secondDifference = minuteDifference * 60;
            setDisplay([
                `Days: ${dayDifference}`,
                `Hours: ${hourDifference}`,
                `Minutes: ${minuteDifference}`,
                `Seconds: ${secondDifference}`
            ]);
        }
    };

    const setTodayStartDate = () => {
        const today = new Date().toISOString().slice(0, 10);
        setStartDate(today);
    };

    const setTodayEndDate = () => {
        const today = new Date().toISOString().slice(0, 10);
        setEndDate(today);
    };

    return (
        <div className="container">
            <h3>Days Calculator:Days Between Two Dates</h3>
            <div className="date_count_app">
                <form className="startDate-Form">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <button type="button" onClick={setTodayStartDate}>Today</button>
                </form>
                <form className="endDate-Form">
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <button type="button" onClick={setTodayEndDate}>Today</button>
                </form>
                <div className="checkbox">
                    <input className="chec-btn" type="checkbox" checked={addExtraDay} onChange={(e) => setAddExtraDay(e.target.checked)} />
                    <label>Add an extra day to the end date</label>
                </div>
                <button type="button" onClick={handleCalculation}>Calculate duration</button>
                {display !== null && (
                    <div className="resultDisplay">
                        <p>From and including : {startDate}</p>
                        <ul>{display.map((item, index) => (<li key={index}>{item}</li>))}</ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DateCount;
