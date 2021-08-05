import { useState, useEffect, useRef } from 'react'
import 'modern-normalize'
import s from './app.module.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from './services/pixabay-api'

import Searchbar from './Components/Searchbar'
import ImageGallery from './Components/ImageGallery/ImageGallery'
import Modal from './Components/Modal'
import Button from './Components/Button'
import CustomLoader from './Components/Loader'

export default function App({ largeImageURL }) {
	const [images, setImages] = useState([])
	const [searchName, setSearchName] = useState('')
	const [errors, setErrors] = useState(null)
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [showModal, setShowModal] = useState(false)
	const [modalImgProps, setModalImgProps] = useState('')

	const isFerstRenfer = useRef(true)

	const hendleFormSubmit = (query) => {
		if (searchName !== query) {
			setSearchName(query)
			setCurrentPage(1)
			setImages([])
			setErrors(null)
		}
	}

	useEffect(() => {
		if (isFerstRenfer.current) {
			isFerstRenfer.current = false
			return
		}
		async function fetchImg() {
			try {
				setLoading(true)
				setSearchName(searchName)
				const img = await api(searchName, currentPage)
				setImages((prevState) => [...prevState, ...img.data.hits])
				setLoading(false)
			} catch (error) {
				setErrors(error.response.status)
				setLoading(false)
			}
		}
		fetchImg()
	}, [searchName, currentPage])

	const nextPage = () => {
		setCurrentPage((prevState) => prevState + 1)
	}

	const toggleModal = () => {
		setShowModal((showModal) => !showModal)
	}

	const handleImgClick = (largeImageURL) => {
		setModalImgProps(largeImageURL)
		toggleModal()
		console.log(largeImageURL)
	}

	const see = images.length

	const content = errors ? (
		<h2>Упс, ошибка {errors}</h2>
	) : (
		<>
			<ImageGallery image={images} openModal={handleImgClick} />
		</>
	)

	const newContent =
		searchName === '' ? <p>Enter what picture you want to find</p> : content

	return (
		<>
			<div>
				<Searchbar onSubmit={hendleFormSubmit} />
				<ToastContainer position="top-right" autoClose={4000} />

				{newContent}
				{loading && <CustomLoader />}

				{see > 0 && <Button onClick={nextPage} />}
				{showModal && (
					<Modal onClose={toggleModal}>
						<img src={modalImgProps} alt="" className={s.ModalImg} />
					</Modal>
				)}
			</div>
		</>
	)
}
