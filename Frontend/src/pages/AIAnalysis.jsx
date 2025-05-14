import React, { useEffect, useState } from 'react';
import { getAIResponse } from '../services/Expense.service';

function AIAnalysis() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    getAIResponse()
    .then((res)=>{
        // console.log(res.data);
        setAnalysis(res.data)
    })
    // const response = {
    //   total_spent: 1200.5,
    //   spending_by_category: {
    //     Food: 500,
    //     Travel: 300,
    //     Subscriptions: 400.5,
    //   },
    //   recommendation: {
    //     "Good Habits": [
    //       "1. You’re tracking food regularly.",
    //       "2. You’re managing subscriptions well.",
    //     ],
    //     "Needs Improvement": [
    //       "1. Too much on subscriptions.",
    //       "2. High travel expenses.",
    //     ],
    //     Tips: [
    //       "1. Reduce eating out to lower food costs.",
    //       "2. Opt for public transport to cut travel expenses.",
    //       "3. Cancel any unused subscription services to save money.",
    //     ],
    //   },
    // };

    // setAnalysis(response);
  }, []);

  if (!analysis) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-md rounded-lg mt-6 max-w-sm mx-auto text-indigo-600">
      <svg className="animate-spin h-8 w-8 mb-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      <p className="text-lg font-semibold animate-pulse">Loading AI Analysis...</p>
    </div>
  );
}

  return (
    <div className="p-6 bg-linear-to-br to-red-300 from-blue-300 shadow-lg rounded-xl mt-6 mb-4 max-w-xl mx-auto overflow-auto ">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">AI Financial Analysis</h2>

      <div className="mb-4">
        <p className="font-semibold text-lg">Total Spent: ₹{analysis.total_spent.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-md text-gray-700 mb-1">Spending by Category:</h3>
        <ul className="list-disc list-inside">
          {Object.entries(analysis.spending_by_category).map(([category, amount]) => (
            <li key={category}>
              {category}: ₹{amount}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-md text-gray-700 mb-1">Good Habits:</h3>
        <ul className="list-disc list-inside text-green-700">
          {analysis.recommendation["Good Habits"].map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-md text-gray-700 mb-1">Needs Improvement:</h3>
        <ul className="list-disc list-inside text-yellow-600">
          {analysis.recommendation["Needs Improvement"].map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-md text-gray-700 mb-1">AI Tips:</h3>
        <ul className="list-disc list-inside text-blue-700">
          {analysis.recommendation.Tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AIAnalysis;
