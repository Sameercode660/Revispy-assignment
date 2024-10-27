import React from 'react'

function Menu() {
    return (
        <div className='w-full h-[10rem] flex flex-col gap-4'>

            {/* top upper side menu items  */}
            <div className='flex justify-end p-4 space-x-6'>
                <div>
                    <span>Help</span>
                </div>
                <div>
                    Orders & Returns
                </div>
                <div>
                    <span>Hi, John</span>
                </div>
            </div>

            {/* mid Menu item list  */}
            <div className='flex justify-around items-center'>
                <div>
                    <span className='text-[2rem] font-semibold'>Ecommerce</span>
                </div>

                <div className='flex font-semibold space-x-5 text-gray-500'>
                    <div >
                        <span>Categories</span>
                    </div>

                    <div>
                        <span>Sale</span>
                    </div>

                    <div>
                        <span>Clearance</span>
                    </div>

                    <div>
                        <span>New Stock</span>
                    </div>

                    <div>
                        <span>Trending</span>
                    </div>


                </div>

                <div className='flex font-semibold space-x-5 text-gray-500'>

                    <div>
                        <span>Search</span>
                    </div>
                    <div>
                        <span>Cart</span>
                    </div>

                </div>
            </div>



            {/* botton Menu part  */}

            <div className='flex justify-center bg-gray-100'>
                <span>&lt;  Get 10% off on business sign up  &gt;</span>
            </div>
        </div>
    )
}

export default Menu
