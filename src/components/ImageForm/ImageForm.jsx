import { useEffect, useRef } from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { db } from '../../firebaseInit'

import styles from './ImageForm.module.css'

export default function ImageForm(props) {
	const { albumId, updateImage, setUpdateImage, setShowImageForm } = props

	const imageNameRef = useRef()
	const imageUrlRef = useRef()

	// should the image update or not
	useEffect(() => {
		if (updateImage) {
			imageNameRef.current.value = updateImage.name
			imageUrlRef.current.value = updateImage.link
		}
	}, [updateImage])

	// reset inputs
	function clearForm() {
		imageNameRef.current.value = null
		imageUrlRef.current.value = null
		imageNameRef.current.focus()
	}

	// to update any image within the image list
	async function handleUpdateSubmit(e) {
		e.preventDefault()

		// old data of image inside the database
		const oldData = {
			name: updateImage.name,
			link: updateImage.link
		}

		// new updated data entered by the user
		const newData = {
			name: imageNameRef.current.value,
			link: imageUrlRef.current.value
		}

		// adding new Image
		const albumRef = doc(db, 'albums', albumId)
		updateDoc(albumRef, {
			imageList: arrayUnion(newData)
		})

		// removing old image
		updateDoc(albumRef, {
			imageList: arrayRemove(oldData)
		})

		toast.success(' Image Updated !')

		// setting update to false
		setUpdateImage(null)

		// hide the ImageForm
		setShowImageForm(false)

		// clear data within the ImageForm
		clearForm()
	}

	// add a new Image in Image list
	async function handleSubmit(e) {
		e.preventDefault()

		// data of the Image
		const data = {
			name: imageNameRef.current.value,
			link: imageUrlRef.current.value
		}

		// adding new image inside the array of image in database
		console.log(albumId)
		const albumRef = doc(db, 'albums', albumId)
		await updateDoc(albumRef, {
			imageList: arrayUnion(data)
		})

		// success notification
		toast.success('New Image Added to your Album!')

		// clear form's data
		clearForm()
	}

	return (
		<>
			<ToastContainer />
			<div className={styles.formContainer}>
				<h1>{!updateImage ? 'Add an Image' : 'Update Image'}</h1>

				<form onSubmit={updateImage ? handleUpdateSubmit : handleSubmit}>
					<input
						type='text'
						className={styles.input}
						placeholder='Enter Name'
						ref={imageNameRef}
						required
					/>

					<input
						type='text'
						className={styles.input}
						placeholder='Enter Url'
						ref={imageUrlRef}
						required
					/>
					<br />

					<button type='reset' className={`${styles.btn} ${styles.clear}`}>
						Clear
					</button>

					<button className={`${styles.btn} ${styles.add}`}>
						{!updateImage ? 'Add' : 'Update'}
					</button>
				</form>
			</div>
		</>
	)
}
