import React from 'react'
import { usePathname } from 'next/navigation';

const PelayananIcon = () => {
    const pathname = usePathname();

    return (
        <div>
            <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.916016 15.0418C0.916016 6.98745 7.44497 0.458496 15.4993 0.458496C23.5537 0.458496 30.0827 6.98745 30.0827 15.0418V22.5581C30.0827 24.9585 28.0119 26.7085 25.7077 26.7085H21.3327V15.0418H27.166C27.166 11.9476 25.9369 8.98018 23.7489 6.79225C21.561 4.60433 18.5935 3.37516 15.4993 3.37516C12.4052 3.37516 9.43769 4.60433 7.24977 6.79225C5.06185 8.98018 3.83268 11.9476 3.83268 15.0418H9.66602V26.7085H6.84122C7.00291 27.3347 7.36814 27.8894 7.87948 28.2854C8.39082 28.6814 9.01928 28.8962 9.66602 28.896H11.9468C12.4077 28.2354 13.1733 27.8022 14.041 27.8022H16.9577C17.6345 27.8022 18.2837 28.0711 18.7623 28.5497C19.2409 29.0283 19.5098 29.6775 19.5098 30.3543C19.5098 31.0312 19.2409 31.6803 18.7623 32.1589C18.2837 32.6375 17.6345 32.9064 16.9577 32.9064H14.041C13.1733 32.9064 12.4077 32.4733 11.9468 31.8127H9.66602C8.20463 31.8128 6.79642 31.2645 5.71998 30.2761C4.64355 29.2877 3.97732 27.9313 3.8531 26.4752C2.1906 25.9254 0.916016 24.4422 0.916016 22.5595V15.0418ZM6.74935 23.7918V17.9585H3.83268V22.5581C3.83268 23.1312 4.37227 23.7918 5.29102 23.7918H6.74935ZM27.166 17.9585H24.2493V23.7918H25.7077C26.6264 23.7918 27.166 23.1312 27.166 22.5581V17.9585Z" fill={pathname.startsWith("/pelayanan") ? "#2F55D4" : "white"} />
            </svg>

        </div>
    )
}

export default PelayananIcon