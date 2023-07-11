import React from 'react'


export default function Profile({userData}) {
  return (
    <>
    <div className='container py-5 bg-login'>
       <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-6 text-center py-5">
            <i className='fa-solid fa-user fa-10x'></i>
        </div>
        <div className="col-md-6 py-5">
        <h4><span className='text-warning fw-bold'>user Name is :</span> {userData.name} </h4>
        </div>
       </div>
    </div>
    </>
  )
}