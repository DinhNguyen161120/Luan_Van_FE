
import styles from './introduceEdit.module.scss'

const IntroduceEdit = () => {
    return (
        <div className={styles.introduceEdit}>
            <div className={styles.content}>
                <div>Edit Mode</div>
                <p>
                    Chế độ này cho phép bạn chỉnh sửa nhãn của các cạnh.
                </p>
                <div>Những cách bạn có thể tương tác với biểu đồ:</div>
                <ul>
                    <li>Bấm vào một cạnh để thay đổi nhãn của nó. Bây giờ bạn có thể bắt đầu nhập để chỉnh sửa chi phí. Bấm vào bất cứ đâu hoặc nhấn Enter để hoàn tất chỉnh sửa.</li>
                    <li>nhấp đúp vào Nút để chọn hoặc bỏ chọn Nút cuối.</li>
                </ul>
            </div>
        </div >
    )
}

export default IntroduceEdit