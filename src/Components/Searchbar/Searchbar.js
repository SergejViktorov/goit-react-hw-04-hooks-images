import { useState } from 'react'
import { toast } from 'react-toastify'
import s from './searchbar.module.css'
import PropTypes from 'prop-types'

export default function Searchbar({ onSubmit }) {
	const [query, setQuery] = useState('')

	const handleSearchInput = (e) => {
		setQuery(e.currentTarget.value.toLowerCase())
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (query.trim() === '') {
			toast.error('Неккоректный запрос !')
			return
		}
		onSubmit(query)
		resetForm()
	}

	const resetForm = () => {
		setQuery('')
	}

	return (
		<header className={s.Searchbar}>
			<form className={s.SearchForm} onSubmit={handleSubmit}>
				<button type="submit" className={s.SearchFormButton}>
					<span className={s.SearchFormButtonLabel}>Search</span>
				</button>

				<input
					className={s.SearchFormInput}
					type="text"
					autocomplete="off"
					autofocus
					placeholder="Search images and photos"
					value={query}
					onChange={handleSearchInput}
					name="query"
				/>
			</form>
		</header>
	)
}

Searchbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
