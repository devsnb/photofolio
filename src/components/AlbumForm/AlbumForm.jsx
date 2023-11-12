import { useRef } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { db } from '../../firebaseinit'

import styles from './AlbumForm.module.css'

export default function AlbumForm() {
	const nameRef = useRef()

	// add new album the database
	async function handleSubmit(e) {
		e.preventDefault()

		// add new album to the database
		await addDoc(collection(db, 'albums'), {
			albumName: nameRef.current.value,
			imageList: []
		})

		// success message for submission
		toast.success('Album added successfully')
		// clear input after submission
		nameRef.current.value = ''
	}

	return (
		<>
			<ToastContainer />
			<div className={styles.formContainer}>
				<h1>Add New Album</h1>
				<form onSubmit={handleSubmit}>
					<input
						required
						type='text'
						placeholder='Album Name'
						ref={nameRef}
						className={styles.input}
					/>
					<button
						type='reset'
						className={`${styles.btn} ${styles.clearBtn}`}
					>
						Clear
					</button>
					<button className={`${styles.btn} ${styles.addBtn}`}>Add</button>
				</form>
			</div>
		</>
	)
}
