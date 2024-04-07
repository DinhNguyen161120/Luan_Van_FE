
import styles from './introduceDelete.module.scss'

const IntroduceDelete = () => {
    return (
        <div className={styles.introduceDelete}>
            <div className={styles.content}>
                <div>Delete Mode</div>
                <p>
                    Chế độ này cho phép bạn xóa các nút và/hoặc các cạnh.
                </p>
                <div>Những cách bạn có thể tương tác với biểu đồ:</div>
                <ul>
                    <li>Bấm vào một nút để xóa nút</li>
                    <li>Bấm vào một cạnh để xóa cạnh.</li>
                </ul>
            </div>
        </div >
    )
}

export default IntroduceDelete