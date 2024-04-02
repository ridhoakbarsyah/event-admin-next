import { createContext, Dispatch, SetStateAction } from 'react'

interface SidebarContextProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps>({
    sidebarOpen: false,
    setSidebarOpen: () => { },
})

export default SidebarContext