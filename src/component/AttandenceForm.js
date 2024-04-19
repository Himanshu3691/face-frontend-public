import React from 'react';

const AttendanceForm = ({ setAttendanceData, attendanceData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendanceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const { yearData, semData, branchData, lectureData, lectureNameData } = attendanceData;

    // Sample data for the selects
    const years = [
        { id: '1st', year: "First Year" },
        { id: '2nd', year: "Second Year" },
        { id: '3rd', year: "Third Year" },
        { id: '4th', year: "Fourth Year" }
    ];

    const semesters = [
        { id: '1st', semester: "First Semester" },
        { id: '2nd', semester: "Second Semester" },
        { id: '3rd', semester: "Third Semester" },
        { id: '4th', semester: "Fourth Semester" },
        { id: '5th', semester: "Fifth Semester" },
        { id: '6th', semester: "Sixth Semester" },
        { id: '7th', semester: "Seventh Semester" },
        { id: '8th', semester: "Eighth Semester" }
    ];

    const branches = [
        { id: "cse", branch: "CSE" },
        { id: "aiml", branch: "AI & ML" },
        { id: "civil", branch: "Civil" },
        { id: "bca", branch: "BCA" }
    ];

    const lectures = [
        { id: "1st", lecture: "First Lecture" },
        { id: "2nd", lecture: "Second Lecture" },
        { id: "3rd", lecture: "Third Lecture" },
        { id: "4th", lecture: "Fourth Lecture" },
        { id: "5th", lecture: "Fifth Lecture" },
        { id: "6th", lecture: "Sixth Lecture" },
        { id: "7th", lecture: "Seventh Lecture" },
        { id: "8th", lecture: "Eighth Lecture" }
    ];


    return (
        <div className="p-5">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <select 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="yearData"
                    value={yearData}
                    onChange={handleChange}
                >
                    <option value="">Select a year</option>
                    {years.map(year => (
                        <option key={year.id} value={year.id}>{year.year}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Semester</label>
                <select 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="semData"
                    value={semData}
                    onChange={handleChange}
                >
                    <option value="">Select a semester</option>
                    {semesters.map(semester => (
                        <option key={semester.id} value={semester.id}>{semester.semester}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <select 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="branchData"
                    value={branchData}
                    onChange={handleChange}
                >
                    <option value="">Select a branch</option>
                    {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.branch}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Lecture Name</label>
                <input required
                    type="text"
                    name="lectureNameData"
                    value={lectureNameData}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Lecture</label>
                <select 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="lectureData"
                    value={lectureData}
                    onChange={handleChange}
                >
                    <option value="">Select a lecture</option>
                    {lectures.map(lecture => (
                        <option key={lecture.id} value={lecture.id}>{lecture.lecture}</option>
                    ))}
                </select>
            </div>
            
        </div>

    );
};

export default AttendanceForm;  