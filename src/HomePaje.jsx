import React, { useState } from "react";
import { mockJops } from "./DummyData";

function HomePaje() {
  const [formData, setFormData] = useState({
    district: "",
    jops: "",
  });

  const [availableJobs, setAvailableJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setFormData({ ...formData, district: selectedDistrict, jops: "" });

    const districtData = mockJops.find(
      (district) => district.district === selectedDistrict
    );

    setAvailableJobs(districtData ? districtData.jops : []);
    setFilteredJobs([]);
  };

  const handleJobChange = (event) => {
    setFormData({ ...formData, jops: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filtered = availableJobs.filter(
      (job) => formData.jops === "" || job.jobTitle === formData.jops
    );

    setFilteredJobs(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3 p-4 bg-yellow-400 rounded-lg">
        <label htmlFor="district">District</label>
        <select
          className="p-1 border border-black rounded-md"
          id="district"
          value={formData.district}
          onChange={handleDistrictChange}
        >
          <option value="">Select District</option>
          {mockJops.map((district, index) => (
            <option key={index} value={district.district}>
              {district.district}
            </option>
          ))}
        </select>

        <label htmlFor="jops">Job Title</label>
        <select
          className="p-1 border border-black rounded-md"
          id="jops"
          value={formData.jops}
          onChange={handleJobChange}
          disabled={!availableJobs.length}
        >
          <option value="">Select Job</option>
          {availableJobs.map((job, index) => (
            <option key={index} value={job.jobTitle}>
              {job.jobTitle}
            </option>
          ))}
        </select>

        <button
          className="p-2 bg-red-400 rounded-full hover:bg-red-700"
          onClick={handleSubmit}
        >
          Find Jobs
        </button>
      </div>

      <div className="mt-6">
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="p-4 bg-indigo-600 border border-gray-300 rounded-md shadow-md"
              >
                <h2 className="text-lg font-semibold">{job.jobTitle}</h2>
                <p>Company: {job.companyName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-3xl text-center text-black">
            No jobs found for the selected criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePaje;
