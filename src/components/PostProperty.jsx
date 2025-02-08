import React from 'react'
import './PostPropertyStyles.css'
import ListingStep_1 from './ListingStep_1'

const PostProperty = () => {
  return (
    <div className='postPropery-container'>
      <div className="our-ad">
        sell or rent your  property  online faster in riseacre.in
      </div>
      <div className="steps-section">
        <ListingStep_1/>
      </div>
    </div>
  )
}

export default PostProperty
