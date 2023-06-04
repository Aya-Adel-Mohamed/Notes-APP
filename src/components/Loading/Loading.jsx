import React from 'react'

export default function Loading() {
  return (
    <>
    <div className="d-flex bg-loading justify-content-center align-items-center position-absolute top-0 bottom-0 end-0 start-0">
    <div className="loading">
    <div className="spinner">
    <div className="cube1"></div>
    <div className="cube2"></div>
    </div>
    </div>
    </div>
    </>
  )
}