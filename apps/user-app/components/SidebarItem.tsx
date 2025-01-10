"use client"
import { usePathname, useRouter } from "next/navigation"

interface SidebarItemInterface {
    title: string,
    href: string,
    icon: React.ReactNode
}

export const SidebarItem = ({ title, href, icon } : SidebarItemInterface) => {
    const router = useRouter();
    const pathname = usePathname();
    const selected = pathname === href
    return (
        <div className={`flex ${selected? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer p-2 pl-10 `} onClick={()=>{
            router.push(href);
        }}>
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold ${selected? "text-[#6a51a6]" : "text-slate-500"}`}>
                {title}
            </div>
        </div>
    )
}