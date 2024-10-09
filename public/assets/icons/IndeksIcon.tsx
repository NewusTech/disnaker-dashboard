import React from 'react'
import { usePathname } from 'next/navigation';


const IndeksIcon = () => {
    const pathname = usePathname();

    return (
        <div>
            <svg width="27" height="31" viewBox="0 0 27 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.75 3.83268V9.66602H22.25V3.83268H25.1769C25.976 3.83268 26.625 4.48164 26.625 5.28081V28.6346C26.6246 29.0185 26.4719 29.3866 26.2004 29.6581C25.9289 29.9296 25.5608 30.0823 25.1769 30.0827H1.82313C1.43906 30.0827 1.07072 29.9301 0.799146 29.6585C0.52757 29.387 0.375 29.0186 0.375 28.6346V5.28081C0.375 4.48164 1.02396 3.83268 1.82313 3.83268H4.75ZM9.125 22.791H6.20833V25.7077H9.125V22.791ZM9.125 18.416H6.20833V21.3327H9.125V18.416ZM9.125 14.041H6.20833V16.9577H9.125V14.041ZM19.3333 0.916016V6.74935H7.66667V0.916016H19.3333Z" fill={pathname.startsWith("/indeks-kepuasan") ? "#2F55D4" : "white"} />
            </svg>
        </div>
    )
}

export default IndeksIcon