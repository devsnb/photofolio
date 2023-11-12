import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'

import Album from '../Album/Album'
import AlbumForm from '../AlbumForm/AlbumForm'
import ImageList from '../ImageList/ImageList'
import { db } from '../../firebaseinit'

import styles from './AlbumList.module.css'

export default function AlbumList() {
	const [albumList, setAlbumList] = useState([])
	const [showAlbumForm, setShowAlbumForm] = useState(false)
	const [openAlbum, setOpenAlbum] = useState({ albumId: '', open: false })

	// get all albums on initial render
	useEffect(() => {
		// realtime updates from firestore
		onSnapshot(collection(db, 'albums'), snapShot => {
			const card = snapShot.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data()
				}
			})

			setAlbumList(card)
		})
	}, [])

	return (
		<>
			<div className={styles.mainContainer}>
				{!openAlbum.open ? (
					<>
						<div className={styles.albumForm}>
							{showAlbumForm && <AlbumForm />}
						</div>

						<div className={styles.header}>
							<span>Your Albums</span>
							<button
								className={styles.btn}
								onClick={() => setShowAlbumForm(!showAlbumForm)}
							>
								{!showAlbumForm ? 'Create Album' : 'Cancel'}
							</button>
						</div>

						<div className={styles.albumContainer}>
							{albumList.map((card, i) => (
								<Album key={i} info={card} setOpenAlbum={setOpenAlbum} />
							))}
						</div>
					</>
				) : (
					<ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
				)}
			</div>
		</>
	)
}
