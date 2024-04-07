
import { useState } from 'react';
import ConfigMode from '../Modes/ConfigMode';
import IntroduceDelete from '../Modes/introduceDelete';
import IntroduceDraw from '../Modes/introduceDraw';
import IntroduceEdit from '../Modes/introduceEdit';
import IntroduceForce from '../Modes/introduceForce';
import styles from './ExplainMode.module.scss'
export const ExplainMode = ({ mode, setMode = () => { } }) => {
    const [showExplainMode, setShowExplainMode] = useState(false)
    const handleShowExplainMode = () => {
        setShowExplainMode(!showExplainMode)
    }
    return (
        <>
            <div className={styles.mode}>
                <button
                    className={mode === 0 ? styles.selectMode : ""}
                    onClick={() => {
                        setMode(0);
                    }}
                >
                    Force
                </button>
                <button
                    className={mode === 1 ? styles.selectMode : ""}
                    onClick={() => {
                        setMode(1);
                    }}
                >
                    Draw
                </button>
                <button
                    className={mode === 2 ? styles.selectMode : ""}
                    onClick={() => {
                        setMode(2);
                    }}
                >
                    Delete
                </button>
                <button
                    className={mode === 3 ? styles.selectMode : ""}
                    onClick={() => {
                        setMode(3);
                    }}
                >
                    Edit
                </button>
                <button
                    className={mode === 4 ? styles.selectMode : ""}
                    onClick={() => {
                        setMode(4);
                    }}
                >
                    Config
                </button>
                <div>
                    <button className={styles.modeDetails}
                        onClick={handleShowExplainMode}
                    >
                        Chi tiết Mode
                    </button>
                </div>
            </div>
            <div className={`${styles.explainMode} ${showExplainMode ? '' : styles.hideExplainMode}`}>
                <div>Nhập kí tự $ thay thế cho kí tự ε </div>
                <div className={styles.describeState}>
                    <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
                        <circle class="node start-border" r="20" cx="25" cy='25'></circle>
                    </svg>
                    <label>Trạng thái bắt đầu</label>
                </div>
                <div className={styles.describeState}>
                    <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
                        <circle class="node final-border" r="20" cx="25" cy='25'></circle>
                    </svg>
                    <label>Trạng thái kết thúc</label>
                </div>
                <div className={styles.describeState}>
                    <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
                        <circle class="node start-border node-fill-start-end" r="20" cx="25" cy='25'></circle>
                    </svg>
                    <label>Vừa là trạng thái bắt đầu và kết thúc</label>
                </div>
                <div>
                    {mode == 0 && <IntroduceForce />}
                    {mode == 1 && <IntroduceDraw />}
                    {mode == 2 && <IntroduceDelete />}
                    {mode == 3 && <IntroduceEdit />}
                    {mode == 4 && <ConfigMode />}
                </div>
            </div>
        </>
    );
};
