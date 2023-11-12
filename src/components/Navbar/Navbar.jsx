import styles from './Navbar.module.css'
import cameraLogo from '../../assets/images/camera.png'

export default function Navbar() {
	return (
		<>
			<div className={styles.navbar}>
				<div className={styles.container}>
					<img className={styles.coverImage} src={cameraLogo} alt='album' />
					<span>PhotoFolio</span>
				</div>
			</div>
		</>
	)
}
