import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const ReportedItem = () => {

    const [reportedItem, setReportedItem] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reportItems')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setReportedItem(data);
            })
    }, [])
    return (
        <div>
            <h2 className='font-bold mb-6'>{reportedItem.length} Reported Item here </h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Book Name</th>
                                <th>Book's Info</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                reportedItem?.map((report, i) => <tr key={report._id}>
                                    <th>{i + 1}</th>
                                    <td>{report.bookName}</td>
                                    <td><p>Original Price: {report.originalPrice}</p>
                                        <p>Resale Price: {report.resalePrice}</p>
                                        <p>Condition: {report.condition}</p>
                                    </td>

                                    <td className='font-bold'>{report.status}</td>
                                    <td><button
                                        className='btn btn-nutral btn-sm'
                                    >Delete</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportedItem;