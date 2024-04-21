import React from 'react';

const AttendanceTable = ({ attendance }) => {
    console.log(
        "AttendanceTable -> attendance",
        attendance
    );
    return (<div>
    { attendance && attendance.attendance && attendance.attendance.length > 0 ?
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Attendance</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-800">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-600 px-4 py-2">Date</th>
                            <th className="border border-gray-600 px-4 py-2">Year</th>
                            <th className="border border-gray-600 px-4 py-2">Semester</th>
                            <th className="border border-gray-600 px-4 py-2">Branch</th>
                            <th className="border border-gray-600 px-4 py-2">Lecture Name</th>
                            <th className="border border-gray-600 px-4 py-2">Lecture No</th>
                            <th className="border border-gray-600 px-4 py-2">Student Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(attendance.attendance) && attendance.attendance.map((record, index) => (
                            <tr key={index}>
                                <td className="border border-gray-600 px-4 py-2 text-blue-800">{record.date}</td>
                                <td className="border border-gray-600 px-4 py-2 text-blue-800">{record.year}</td>
                                <td className="border border-gray-600 px-4 py-2 text-blue-800">{record.sem}</td>
                                <td className="border border-gray-600 px-4 py-2 text-blue-800">{record.branch}</td>
                                <td className="border border-gray-600 px-4 py-2 text-blue-800">{record.lecture_name}</td>
                                <td className="border border-gray-600 px-4 py-2 text-blue-800">{record.lecture_no}</td>
                                <td className="border border-gray-600 px-4 py-2 text-blue-800">{record.student__name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>:""}
        </div>
    );
};

export default AttendanceTable;