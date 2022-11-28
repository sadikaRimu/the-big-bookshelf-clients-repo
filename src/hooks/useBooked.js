import { useEffect, useState } from "react";

const useBooked = booksCategory => {
    const [isBooked, setIsBooked] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (booksCategory) {
            fetch(`https://sadika-assignment12-server.vercel.app/books/${booksCategory}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsBooked(data.isBooked);
                    setIsAdminLoading(false);
                })
        }
    }, [booksCategory]);
    return [isBooked, isAdminLoading]
}
export default useBooked;