import Link from 'next/link'

interface SidebarNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    active?: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ href, children, active, ...props }) => {
    return (
        <Link href={href}
            className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${active && 'bg-graydark dark:bg-meta-4'}`} {...props}>
            {children}
        </Link >
    )
}

export default SidebarNavLink
