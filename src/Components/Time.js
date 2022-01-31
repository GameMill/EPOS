
import React, { useState, useEffect } from 'react';

export default function LiveTime()
{
  const [currentTime, setCurrentTime] = useState("Loading...");
  const [currentDate, setCurrentDate] = useState("Loading...");

      useEffect(() => {
        const interval = setInterval(() => {
            var today = new Date();
            var time = ("0"+today.getHours().toString()).slice(-2)  + ":" + ("0"+today.getMinutes().toString()).slice(-2)  + ":" + ("0"+today.getSeconds().toString()).slice(-2);
            var date = ("0"+today.getDate().toString()).slice(-2)  + "-" + ("0"+(today.getMonth()+1).toString()).slice(-2)  + "-" + ("0"+today.getFullYear().toString()).slice(-2);
            setCurrentTime(time);
            setCurrentDate(date)
        }, 1000);
        return () => clearInterval(interval);
      }, []);

      return <span>{currentDate} | {currentTime}</span>;
}