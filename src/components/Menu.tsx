import React from 'react'

function Menu() {
    return (
        <div className='w-full h-[10rem] border-2 border-red-500 flex flex-col gap-4'>

            {/* top upper side menu items  */}
            <div className='flex justify-end'>
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
            <div className='flex justify-around'>
                <div>
                    <span>Ecommerce</span>
                </div>

                <div className='flex'>
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

                <div className='flex'>

                    <div >
                        <span>Search</span>
                    </div>
                    <div>
                        <span>Cart</span>
                    </div>

                </div>
            </div>



            {/* botton Menu part  */}

            <div className='flex justify-center'>
                <span>Get 10% off on business sign up</span>
            </div>
        </div>
    )
}

export default Menu
