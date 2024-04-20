import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import AttendanceTable from './AttendanceTable';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [attandence ,setattance] =useState([])
   
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

    const [data, setFormData] = useState({
        yearData: "",
        semData: "",
        branchData: "",
        lectureData: "",
        lectureNameData: "",
        selectedDate:null
    });
    const responseDateString = data.selectedDate;
    const responseDate = new Date(responseDateString);
    const year = responseDate.getFullYear();
    const month = String(responseDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    const day = String(responseDate.getDate()).padStart(2, "0")
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    console.log(typeof(formattedDate));
   
    const handleChange = (e) => {
      setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
          selectedDate:formattedDate
      }));
  };
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
        ...prevData,
        selectedDate: date // Update selectedDate when date changes
    }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
      // Convert selectedDate from datetime to date
      const selectedDate = new Date(data.selectedDate);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      // Replace selectedDate in data
      const newData = { ...data, selectedDate: formattedDate };

      const response = await axios.get('http://127.0.0.1:8000/getdashboard/', {
          params: newData
      });
      setattance(response.data)
      console.log('Data retrieved:', response.data);
      alert('Data retrieved successfully');
  } catch (error) {
      console.error('Error retrieving data:', error);
      alert('An error occurred while retrieving data');
  } finally {
      setLoading(false);
  }
};

    return (
        <div className="p-5">
            <form onSubmit={handleSubmit} className='space-y-4'>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="yearData"
                    value={data.yearData}
                    onChange={handleChange}
                >
                    <option value="">Select a year</option>
                    {years.map((year) => (
                        <option key={year.id} value={year.id}>
                            {year.year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Semester</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="semData"
                    value={data.semData}
                    onChange={handleChange}
                >
                    <option value="">Select a semester</option>
                    {semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                            {semester.semester}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Branch</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="branchData"
                    value={data.branchData}
                    onChange={handleChange}
                >
                    <option value="">Select a branch</option>
                    {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                            {branch.branch}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Lecture Name</label>
                <input
                    type="text"
                    name="lectureNameData"
                    value={data.lectureNameData}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Lecture</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="lectureData"
                    value={data.lectureData}
                    onChange={handleChange}
                >
                    <option value="">Select a lecture</option>
                    {lectures.map((lecture) => (
                        <option key={lecture.id} value={lecture.id}>
                            {lecture.lecture}
                        </option>
                    ))}
                </select>
                <div>
                    <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg font-semibold shadow-md hover:shadow-lg transition-all">
                        {loading ? 'Sending......' : 'Get'}
                    </button>
                </div>
                <div className="">
            <h2 className="text-lg font-semibold mb-2">Select a Date:</h2>
            <DatePicker
                selected={data.selectedDate} // Pass selectedDate state as the selected prop
                onChange={handleDateChange} // Handle date change
                dateFormat="yyyy-MM-dd" // Set date format
                placeholderText="Select a date" // Placeholder text for the input field
                showMonthYearPicker
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
            </div>
            </form>
            <AttendanceTable attendance={attandence} />
        </div>
    );
};

export default Dashboard;