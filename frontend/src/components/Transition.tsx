import React from "react";
import { Power4 } from "gsap";

const Transition = ({ timeline }: { timeline: GSAPTimeline }) => {
    React.useEffect(() => {
        timeline.fromTo(
            ".transition-effect",
            {
                width: "100%",
                height: "100vh",
            },
            {
                width: "0%",
                duration: 2.5,
                ease: Power4.easeOut,
                display: "none"
            }
        );
    }, []);

    return (
        <div>
            <div className="transition-effect absolute z-[10000000000] bg-black top-0 right-0"></div>
        </div>
    );
};

export default Transition;
