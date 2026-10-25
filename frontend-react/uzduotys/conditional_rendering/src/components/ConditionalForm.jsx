import { useState } from 'react';

// Formos su sąlyginiais laukais komponentas.
const ConditionalForm = () => {
  const [userType, setUserType] = useState('student');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');

  return (
    <section className="flex min-h-64 flex-col items-center rounded-lg border border-gray-300 bg-white p-6 text-center">
      <span className="text-sm text-gray-500">Exercise 7</span>

      <h2 className="mt-3 mb-5 text-xl font-semibold">Controlled Form with Conditional Fields</h2>

      <div className="flex w-full max-w-80 flex-col gap-3 text-left">
        <label htmlFor="user-type" className="text-sm">
          User Type
        </label>

        <select
          id="user-type"
          value={userType}
          onChange={(event) => setUserType(event.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {userType === 'student' ? (
          <>
            <label htmlFor="grade" className="text-sm">
              Grade
            </label>

            <input
              id="grade"
              type="text"
              placeholder="Enter grade"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm"
            />
          </>
        ) : (
          <>
            <label htmlFor="subject" className="text-sm">
              Subject
            </label>

            <input
              id="subject"
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm"
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ConditionalForm;
