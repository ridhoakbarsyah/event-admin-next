'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import SidebarContext from './SidebarContext'

interface OuterLayoutProps {
    children: ReactNode
}

export default function OuterLayout({ children }: OuterLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <SessionProvider>
            <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
                <div className="flex h-screen overflow-hidden">
                    {/* <!-- ===== Sidebar Start ===== --> */}
                    <Sidebar />
                    {/* <!-- ===== Sidebar End ===== --> */}

                    {/* <!-- ===== Content Area Start ===== --> */}
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                        {/* <!-- ===== Header Start ===== --> */}
                        <Header />
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                {children}
                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                    </div>
                    {/* <!-- ===== Content Area End ===== --> */}
                </div>
            </SidebarContext.Provider>
        </SessionProvider>
    )
}
