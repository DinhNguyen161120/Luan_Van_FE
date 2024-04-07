
import styles from './introduceForce.module.scss'

const IntroduceForce = () => {
    return (
        <div className={styles.introduceForce}>
            <div className={styles.content}>
                <div>Force Mode</div>
                <p>
                    Trong chế độ này, có một lực hấp dẫn tác động lên các nút và giữ chúng ở giữa vùng vẽ.
                    Ngoài ra, các nút tác dụng lực lên nhau, làm cho toàn bộ đồ thị trông và hoạt động giống như các vật thể thực trong không gian.
                </p>
                <div>Những cách bạn có thể tương tác với biểu đồ:</div>
                <ul>
                    <li>Các nút hỗ trợ kéo và thả.</li>
                </ul>
            </div>
        </div >
    )
}

export default IntroduceForce