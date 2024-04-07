import styles from "./ConfigMode.module.scss";
import { useSelector, useDispatch } from "react-redux";
import graphActions from "../../redux/action/graphActions";
const ConfigMode = () => {
    let linkLength = useSelector((state) => state.graph.linkLength);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch({
            type: graphActions.SET_LINK_LENGTH,
            linkLength: e.target.value,
        });
    };
    return (
        <div className={styles.ConfigMode}>
            <div className={styles.content}>
                <div>Config Mode</div>
                <p>
                    Chế độ này cho phép bạn thay đổi nhãn của nút và điều chỉnh các thông số.
                </p>
                <div>Những cách bạn có thể tương tác với biểu đồ:</div>
                <ul>
                    <li>Bấm vào một nút để thay đổi nhãn</li>
                </ul>
            </div>
            <div>Thông số: </div>
            <div className="flex gap-3 pl-[20px]">
                <div>Chiều dài cạnh: </div>
                <input type="number" value={linkLength} onChange={handleChange} />
            </div>
        </div >
    );
};

export default ConfigMode;
