import React from 'react'
import s from './imageGalleryItem.module.css'
import PropTypes from 'prop-types'

const ImageGalleryItem = ({ id, webformatURL, openModal, largeImageURL }) => {
	return (
		<li className={s.ImageGalleryItem} key={id}>
			<img
				src={webformatURL}
				alt=""
				className={s.ImageGalleryItemImage}
				onClick={() => openModal(largeImageURL)}
			/>
		</li>
	)
}
ImageGalleryItem.propTepes = {
	id: PropTypes.number.isRequired,
	webformatURL: PropTypes.string.isRequired,
	openModal: PropTypes.func.isRequired,
	largeImageURL: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired,
}

export default ImageGalleryItem
