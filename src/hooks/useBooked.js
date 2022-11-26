import { useEffect, useState } from "react";

const useBooked = booksCategory => {
    const [isBooked, setIsBooked] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (booksCategory) {
            fetch(`http://localhost:5000/books/${booksCategory}`)
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