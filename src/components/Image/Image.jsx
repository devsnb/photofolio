import styles from './Image.module.css'

export default function Image({
	image,
	index,
	handleImageEdit,
	handleImageDelete,
	onLightBoxOpen
}) {
	return (
		<>
			<div className={styles.imageCard}>
				<div className={styles.imageBox}>
					<img
						src={image.link}
						alt='none'
						onClick={() => onLightBoxOpen(index)}
					/>
				</div>

				<div className={styles.imageInfo}>
					{image.name}
					<button
						className={`${styles.imageBtn} ${styles.editBtn}`}
						onClick={() => handleImageEdit(image)}
					>
						Edit
					</button>

					<button
						className={`${styles.imageBtn} ${styles.deleteBtn}`}
						onClick={() => handleImageDelete(image)}
					>
						X
					</button>
				</div>
			</div>
		</>
	)
}
