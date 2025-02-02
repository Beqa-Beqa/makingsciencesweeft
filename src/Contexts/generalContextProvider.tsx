import { createContext, useEffect, useState } from "react";
import { throttle } from "../Utilities/general";

export const generalContext = createContext<{
    loadScheduled: boolean,
    setLoadScheduled: React.Dispatch<React.SetStateAction<boolean>>
}>({
    loadScheduled: false,
    setLoadScheduled: () => {}
});


const GeneralContextProvider = (props: {children: React.ReactNode}) => {
    const [loadScheduled, setLoadScheduled] = useState<boolean>(false);

    useEffect(() => {
        const scrollListener = () => {
            // document.body.scrollHeight --> whole scrollable area
            // window.scrollY --> scrolled area
            // window.innerHeight --> visible window height
            const offset = 2000;
            const shouldLoad = document.body.scrollHeight - offset < window.scrollY + window.innerHeight;

            // Only update state if it actually changes
            setLoadScheduled(prev => prev !== shouldLoad ? shouldLoad : prev);
        }

        const throttledListener = throttle(scrollListener, 300)

        window.addEventListener('scroll', throttledListener);

        return () => {
            window.removeEventListener('scroll', throttledListener);
        }
    }, []);

    return <generalContext.Provider value={{ loadScheduled, setLoadScheduled }}>
        {props.children}
    </generalContext.Provider>
}

export default GeneralContextProvider;