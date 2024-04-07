
import styles from './introduceDraw.module.scss'

const IntroduceDraw = () => {
    return (
        <div className={styles.introduceDraw}>
            <div className={styles.content}>
                <div>Draw Mode</div>
                <p>
                    Chế độ này cho phép bạn vẽ các nút và/hoặc cạnh mới.
                </p>
                <div>Những cách bạn có thể tương tác với biểu đồ:</div>
                <ul>
                    <li>Nhấp vào bất kỳ vị trí nào trên khung vẽ biểu đồ sẽ tạo ra một nút mới.</li>
                    <li>Nhấp vào một nút sẽ bắt đầu quá trình vẽ một cạnh mới.</li>
                    <li>Để hủy cạnh mới, hãy nhấp vào bất kỳ vị trí nào trên khung vẽ.</li>
                    <li>Để hoàn tất việc vẽ cạnh, hãy nhấp vào hàng xóm mong muốn.</li>
                </ul>
            </div>
        </div >
    )
}

export default IntroduceDraw