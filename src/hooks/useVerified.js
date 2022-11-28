import { useEffect, useState } from "react";

const useVerified = email => {
    const [isVerified, setIsVerified] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://sadika-assignment12-server.vercel.app/users/verified/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsVerified(data.isVerified);
                    setIsAdminLoading(false);
                })
        }
    }, [email]);
    return [isVerified, isAdminLoading]
}
export default useVerified;