import React from "react";

const useDate = () => {
    const locale = "vn";
    // Save the current date to be able to trigger an update
    const [today, setToday] = React.useState<Date>(new Date());

    React.useEffect(() => {
        // Creates an interval which will update the current data every minute
        const timer = setInterval(() => {
            // This will trigger a rerender every component that uses the useDate hook.
            setToday(new Date());
        }, 60 * 1000);
        return () => {
            // Return a funtion to clear the timer so that it will stop being called on unmount
            clearInterval(timer);
        };
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: "long" });
    /*
    1. We’re creating a new Date object and storing it in a variable called today.
    2. We’re creating a variable called locale and storing the current locale in it.
    3. We’re creating a variable called day and storing the current day of the week in it.
    4. We’re creating a variable called date and storing the current date in it.
    */
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(
        locale,
        { month: "long" }
    )}\n\n`;

    const hour = today.getHours();
    const wish = `Good ${
        (hour < 12 && "Morning 😎") || (hour < 17 && "Afternoon 😁") || "Evening 🫠"
    }`;

    /*
    It returns the time in a string format.
    */
    const time = today.toLocaleTimeString(locale, {
        hour: "numeric",
        hour12: true,
        minute: "numeric",
    });

    return {
        date,
        time,
        wish,
    };
};

export default useDate;
