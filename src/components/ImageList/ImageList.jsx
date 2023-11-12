import { useEffect, useState } from 'react'
import ImageForm from '../ImageForm/ImageForm'
import Image from '../Image/Image'
import styles from './imageList.module.css'
import { db } from '../../firebaseInit'
import { doc, updateDoc, arrayRemove, onSnapshot } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ImageList({ openAlbum, setOpenAlbum }) {
	const [showImageForm, setShowImageForm] = useState(false)
	const [updateImage, setUpdateImage] = useState(null)
	const [imageList, setImageList] = useState([])
	const [search, setSearch] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	// go back to album list page
	function handleBackClick(e) {
		e.preventDefault()
		setOpenAlbum({ albumId: '', show: false })
	}

	// load images form firestore
	useEffect(() => {
		onSnapshot(doc(db, 'albums', openAlbum.albumId), doc => {
			const data = doc.data().imageList
			setImageList(data)
		})
	}, [openAlbum.albumId])

	// delete image
	async function handleImageDelete(image) {
		const albumRef = doc(db, 'albums', openAlbum.albumId)
		await updateDoc(albumRef, {
			imageList: arrayRemove(image)
		})

		toast.success('Image Successfully Deleted from your Album!')
	}

	function handleImageEdit(image) {
		setUpdateImage(image)
		setShowImageForm(true)
	}

	// open light box
	const onLightBoxOpen = index => {
		setCurrentImageIndex(index)
		setIsOpen(true)
	}

	// close light box
	const onLightBoxClose = () => {
		setIsOpen(false)
	}

	return (
		<>
			<ToastContainer />
			<div className={styles.btnContainer}>
				<button
					className={`${styles.btn} ${styles.backBtn}`}
					onClick={handleBackClick}
				>
					Back
				</button>

				<input
					className={styles.input}
					type='text'
					placeholder='Search...'
					onChange={e => setSearch(e.target.value)}
				/>

				<button
					className={`${styles.btn} ${styles.addBtn}`}
					onClick={() => setShowImageForm(!showImageForm)}
				>
					{!showImageForm ? 'Add Image' : 'Cancel'}
				</button>
			</div>

			<div style={{ textAlign: 'center' }}>
				{showImageForm && (
					<ImageForm
						albumId={openAlbum.albumId}
						updateImage={updateImage}
						setUpdateImage={setUpdateImage}
						setShowImageForm={setShowImageForm}
					/>
				)}

				<h2 className={styles.header}>
					{imageList.length !== 0
						? 'Your Collection'
						: 'No Images in Your Collection'}
				</h2>
			</div>

			<div className={styles.imageList}>
				{imageList
					.filter(image => {
						return search.toLocaleLowerCase() === ''
							? image
							: image.name.toLocaleLowerCase().includes(search)
					})
					.map((image, i) => (
						<Image
							image={image}
							key={i}
							index={i}
							handleImageEdit={handleImageEdit}
							handleImageDelete={handleImageDelete}
							onLightBoxOpen={onLightBoxOpen}
						/>
					))}
			</div>

			{isOpen && (
				<div className='lightbox-overlay' onClick={onLightBoxClose}>
					<div className='lightbox-container'>
						<button className='close-button' onClick={onLightBoxClose}>
							Close
						</button>
						<img
							className='lightbox-image'
							src={imageList[currentImageIndex].link}
							alt={currentImageIndex}
						/>
					</div>
				</div>
			)}
		</>
	)
}
