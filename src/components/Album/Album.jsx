import styles from './Album.module.css'

export default function Album({ info, setOpenAlbum }) {
	// handler for opening album
	function handleClick() {
		setOpenAlbum({ albumId: info.id, open: true })
	}

	return (
		<>
			<div className={styles.cardContainer}>
				<div className={styles.cardImage} onClick={handleClick}></div>
				<span className={styles.cardName}>{info.albumName}</span>
			</div>
		</>
	)
}
