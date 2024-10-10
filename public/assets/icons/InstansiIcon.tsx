import React from 'react'
import { usePathname } from 'next/navigation';

const InstansiIcon = () => {
    const pathname = usePathname();

    return (
        <div>
            <svg width="23" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.155 0.0400391C20.9075 0.0400391 21.5013 0.279622 21.9363 0.758789C22.3396 1.20296 22.5558 1.79483 22.585 2.53441L22.5881 2.70754V28.6225C22.5881 29.4334 22.3706 30.0807 21.9356 30.5644C21.5323 31.0136 20.9917 31.2542 20.3138 31.2863L20.155 31.29H2.68312C1.93062 31.29 1.33688 31.0484 0.901875 30.565C0.498542 30.115 0.282292 29.5246 0.253125 28.7938L0.25 28.6225V2.70754C0.25 1.88671 0.4675 1.23691 0.9025 0.758164C1.30583 0.313998 1.84646 0.0758724 2.52437 0.0437891L2.68312 0.0400391H20.155ZM15.5088 23.0525H7.46125C7.12958 23.0525 6.86083 23.1525 6.655 23.3525C6.47333 23.5309 6.37208 23.765 6.35125 24.055L6.3475 24.1663V28.93H16.6225V24.1663C16.6225 23.8246 16.5225 23.5536 16.3225 23.3532C16.1442 23.1748 15.91 23.0759 15.62 23.0563L15.5088 23.0525ZM9.39625 16.3982H6.465C6.09292 16.3982 5.89354 16.5794 5.86687 16.9419L5.86375 17.0282V19.8719C5.86375 20.2619 6.03667 20.4709 6.3825 20.4988L6.465 20.5019H9.39625C9.78833 20.5019 9.9975 20.319 10.0238 19.9532L10.0269 19.8719V17.0282C10.0269 16.6365 9.84375 16.4273 9.4775 16.4007L9.39625 16.3982ZM16.4763 16.3982H13.5594C13.1781 16.3982 12.974 16.5794 12.9469 16.9419L12.9437 17.0282V19.8719C12.9437 20.2619 13.1206 20.4709 13.4744 20.4988L13.5594 20.5019H16.4763C16.8683 20.5019 17.0773 20.319 17.1031 19.9532L17.1063 19.8719V17.0282C17.1063 16.6365 16.9231 16.4273 16.5569 16.4007L16.4763 16.3982ZM9.39625 10.4175H6.465C6.09292 10.4175 5.89354 10.5988 5.86687 10.9613L5.86375 11.0482V13.8919C5.86375 14.2819 6.03667 14.4909 6.3825 14.5188L6.465 14.5219H9.39625C9.78833 14.5219 9.9975 14.3388 10.0238 13.9725L10.0269 13.8913V11.0475C10.0269 10.6555 9.84375 10.4465 9.4775 10.4207L9.39625 10.4175ZM16.4763 10.4175H13.5594C13.1781 10.4175 12.974 10.5988 12.9469 10.9613L12.9437 11.0482V13.8919C12.9437 14.2819 13.1206 14.4909 13.4744 14.5188L13.5594 14.5219H16.4763C16.8683 14.5219 17.0773 14.3388 17.1031 13.9725L17.1063 13.8913V11.0475C17.1063 10.6555 16.9231 10.4465 16.5569 10.4207L16.4763 10.4175ZM9.39625 4.43754H6.465C6.09292 4.43754 5.89354 4.61879 5.86687 4.98129L5.86375 5.06754V7.91129C5.86375 8.30129 6.03667 8.51025 6.3825 8.53816L6.465 8.54129H9.39625C9.78833 8.54129 9.9975 8.35837 10.0238 7.99254L10.0269 7.91129V5.06754C10.0269 4.67587 9.84375 4.46671 9.4775 4.44004L9.39625 4.43754ZM16.4763 4.43754H13.5594C13.1781 4.43754 12.974 4.61879 12.9469 4.98129L12.9437 5.06754V7.91129C12.9437 8.30129 13.1206 8.51025 13.4744 8.53816L13.5594 8.54129H16.4763C16.8683 8.54129 17.0773 8.35837 17.1031 7.99254L17.1063 7.91129V5.06754C17.1063 4.67587 16.9231 4.46671 16.5569 4.44004L16.4763 4.43754Z" fill={pathname.startsWith("/instansi-disnaker") ? "#2F55D4" : "white"} />
            </svg>

        </div>
    )
}

export default InstansiIcon