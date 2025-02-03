import { createContext, useEffect, useRef, useState } from "react";
import { INITIAL_SCROLL_OFFSET } from "../Utilities/constants";
import _ from "lodash";

export const generalContext = createContext<{
    loadScheduled: boolean,
    setLoadScheduled: React.Dispatch<React.SetStateAction<boolean>>,
    scrollOffsetRef: React.MutableRefObject<number> | null
}>({
    loadScheduled: false,
    setLoadScheduled: () => {},
    scrollOffsetRef: null
});


const GeneralContextProvider = (props: {children: React.ReactNode}) => {
    const [loadScheduled, setLoadScheduled] = useState<boolean>(false);
    const scrollOffsetRef = useRef<number>(INITIAL_SCROLL_OFFSET);

    useEffect(() => {
        const scrollListener = () => {
            // document.body.scrollHeight --> whole scrollable area
            // window.scrollY --> scrolled area
            // window.innerHeight --> visible window height
            const shouldLoad = document.body.scrollHeight - scrollOffsetRef.current < window.scrollY + window.innerHeight;

            // Only update state if it actually changes
            setLoadScheduled(prev => prev !== shouldLoad ? shouldLoad : prev);
        }

        const throttledListener = _.throttle(scrollListener, 500);

        window.addEventListener('scroll', throttledListener);

        return () => {
            window.removeEventListener('scroll', throttledListener);
        }
    }, []);

    return <generalContext.Provider value={{ loadScheduled, setLoadScheduled, scrollOffsetRef }}>
        {props.children}
    </generalContext.Provider>
}

export default GeneralContextProvider;