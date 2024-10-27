'use client'
import { MouseEventHandler, useEffect, useState } from 'react';
import axios from 'axios';

type Interest = {
  id: string;
  name: string;
  isChecked: boolean;
};

 
//   { id: 1, name: 'Shoes', isChecked: true },
//   { id: 2, name: 'Men T-shirts', isChecked: false },
//   { id: 3, name: 'Makeup', isChecked: true },
//   { id: 4, name: 'Jewellery', isChecked: true },
//   { id: 5, name: 'Women T-shirts', isChecked: false },
//   { id: 6, name: 'Furniture', isChecked: true },
//   { id: 7, name: 'Accessories', isChecked: false },
//   { id: 8, name: 'Gadgets', isChecked: false },
//   // Add more items if necessary
// ];

const ITEMS_PER_PAGE = 6;

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [InterestedCategory, setInterestedCategory] = useState<string[]>([])
  const totalPages = Math.ceil(interests.length / ITEMS_PER_PAGE);
  const [loading, setLoading] = useState<boolean>(false)
  const [buttonState, setButtonState] = useState<boolean>(false)

  const handleCheckboxChange = (id: Number) => {
    setInterests((prevInterests) =>
      prevInterests.map((interest) =>
        Number(interest.id) === id ? { ...interest, isChecked: !interest.isChecked } : interest
      )
    );
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedInterests = interests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  async function handleFetchInterestData() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-category`)
      console.log(response.data.response)
      setInterests(response.data.response)
    } catch (error) {
      console.log(error)
    }
  }


  function handleInterestedCategory(e: any, id: string) {

    if (id in InterestedCategory) {
      return
    }

    if (e.target.checked) {
      setInterestedCategory([...InterestedCategory, id])
    } else {
      setInterestedCategory(InterestedCategory.filter((value: string) => value !== id))
    }
    console.log(InterestedCategory)

  }

  async function handlePostInterestData() {
    try {
      const data = {
        id: localStorage.getItem("id"),
        categories: InterestedCategory
      }
      console.log(data)
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/store-category`, data)
      setLoading(false)

      if(response.data.status) {
        alert("Your interest is successfully saved")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleFetchInterestData()
  }, [])
  return (
    <div className='w-full pt-[50px] flex justify-center items-center'>
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-[700px]">
        <h2 className="text-xl font-semibold mb-2">Please mark your interests!</h2>
        <p className="text-gray-500 mb-4">We will keep you notified.</p>
        <hr className="w-full border-t border-gray-200 mb-4" />

        <h3 className="text-lg font-medium mb-4">My saved interests!</h3>
        <div className="space-y-2">
          {paginatedInterests.map((interest) => (
            <label key={interest.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={interest.isChecked}
                onChange={() => handleCheckboxChange(Number(interest.id))}
                onClick={(e) => {
                  handleInterestedCategory(e, interest.id)
                }}
                className="form-checkbox h-5 w-5 text-black border-gray-300 rounded"
              />
              <span className={interest.isChecked ? 'font-semibold' : 'text-gray-400'}>
                {interest.name}
              </span>
            </label>
          ))}
        </div>

        <div className="flex space-x-2 mt-4 text-gray-600">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt;&lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 ${index + 1 === currentPage ? 'font-semibold text-black' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;&gt;
          </button>
        </div>
        <div>
          <button className='text-white bg-black w-[200px] h-[2.2rem] m-4 rounded-md' disabled={buttonState} onClick={handlePostInterestData}>{loading ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
}
