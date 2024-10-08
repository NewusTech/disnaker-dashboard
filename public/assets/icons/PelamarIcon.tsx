import React from 'react'
import { usePathname } from 'next/navigation';

const PelamarIcon = () => {
    const pathname = usePathname();
    return (
        <div>
            <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.0312 5.84375C10.0312 4.39335 10.6074 3.00235 11.633 1.97676C12.6586 0.95117 14.0496 0.375 15.5 0.375C16.9504 0.375 18.3414 0.95117 19.367 1.97676C20.3926 3.00235 20.9688 4.39335 20.9688 5.84375C20.9688 7.29415 20.3926 8.68515 19.367 9.71074C18.3414 10.7363 16.9504 11.3125 15.5 11.3125C14.0496 11.3125 12.6586 10.7363 11.633 9.71074C10.6074 8.68515 10.0312 7.29415 10.0312 5.84375ZM20.9688 10.2188C20.9688 9.05843 21.4297 7.94563 22.2502 7.12516C23.0706 6.30469 24.1834 5.84375 25.3438 5.84375C26.5041 5.84375 27.6169 6.30469 28.4373 7.12516C29.2578 7.94563 29.7188 9.05843 29.7188 10.2188C29.7188 11.3791 29.2578 12.4919 28.4373 13.3123C27.6169 14.1328 26.5041 14.5938 25.3438 14.5938C24.1834 14.5938 23.0706 14.1328 22.2502 13.3123C21.4297 12.4919 20.9688 11.3791 20.9688 10.2188ZM1.28125 10.2188C1.28125 9.05843 1.74219 7.94563 2.56266 7.12516C3.38313 6.30469 4.49593 5.84375 5.65625 5.84375C6.81657 5.84375 7.92937 6.30469 8.74984 7.12516C9.57031 7.94563 10.0312 9.05843 10.0312 10.2188C10.0312 11.3791 9.57031 12.4919 8.74984 13.3123C7.92937 14.1328 6.81657 14.5938 5.65625 14.5938C4.49593 14.5938 3.38313 14.1328 2.56266 13.3123C1.74219 12.4919 1.28125 11.3791 1.28125 10.2188ZM7.20208 18.0471C8.09192 16.6531 9.3186 15.5059 10.7689 14.7111C12.2191 13.9164 13.8463 13.4999 15.5 13.5C16.8852 13.4987 18.255 13.79 19.5197 14.3548C20.7845 14.9196 21.9158 15.7452 22.8394 16.7774C23.763 17.8097 24.4582 19.0254 24.8795 20.3449C25.3008 21.6644 25.4386 23.0581 25.284 24.4346C25.2651 24.6056 25.2061 24.7697 25.1118 24.9137C25.0175 25.0576 24.8907 25.1772 24.7415 25.2629C21.929 26.8763 18.7423 27.7232 15.5 27.7188C12.2577 27.7232 9.07096 26.8763 6.25854 25.2629C6.10934 25.1772 5.98245 25.0576 5.88819 24.9137C5.79393 24.7697 5.73495 24.6056 5.71604 24.4346C5.47265 22.1985 5.99667 19.9461 7.20208 18.0471Z" fill={pathname.startsWith("/pelamar") ? "#2F55D4" : "white"} />
                <path d="M5.41125 16.7871L5.35875 16.8673C3.95768 19.0721 3.30746 21.6709 3.50521 24.2757C2.62902 24.1429 1.76724 23.928 0.93125 23.634L0.763542 23.5757C0.61361 23.523 0.482288 23.4278 0.385668 23.3017C0.289049 23.1755 0.231329 23.0239 0.219583 22.8654L0.205 22.689C0.193333 22.5422 0.1875 22.3959 0.1875 22.25C0.187588 20.8421 0.730676 19.4884 1.70371 18.4709C2.67674 17.4533 4.00474 16.8502 5.41125 16.7871ZM27.4963 24.2757C27.6957 21.6381 27.0257 19.0078 25.5887 16.7871C26.3225 16.82 27.0421 17.0004 27.7047 17.3174C28.3672 17.6345 28.9591 18.0818 29.445 18.6326C29.9309 19.1835 30.3008 19.8265 30.5328 20.5234C30.7647 21.2203 30.8539 21.9568 30.795 22.689L30.7804 22.8654C30.7684 23.0237 30.7106 23.1749 30.614 23.3008C30.5173 23.4267 30.3862 23.5217 30.2365 23.5742L30.0688 23.6325C29.2414 23.9261 28.3839 24.1405 27.4963 24.2757Z" fill={pathname.startsWith("/pelamar") ? "#2F55D4" : "white"} />
            </svg>
        </div>
    )
}

export default PelamarIcon