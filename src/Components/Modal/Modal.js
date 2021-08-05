import { useEffect } from 'react'
import s from './modal.module.css'
import PropTypes from 'prop-types'

export default function Modal({ onClose, children }) {
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.code === 'Escape') {
				onClose()
			}
		}
		window.addEventListener('keydown', handleKeyPress)
		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
	}, [onClose])

	const handleBackdropClick = (e) => {
		if (e.currentTarget === e.target) {
			onClose()
		}
	}

	return (
		<div className={s.Overlay} onClick={handleBackdropClick}>
			<div className={s.Modal}>{children}</div>
		</div>
	)
}

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
}
