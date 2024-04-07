
import { getEpsilonClosure, transition_function_star } from '../utils/commonFunctions'
import styles from './toolRead.module.scss'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons'
import { SUFFIX_NODE_LABEL } from '../utils/constantVariable'
const ToolRead = ({
    automata,
    typeAutomata,
    setNodeAfterRead = () => { }
}) => {
    const [text, setText] = useState('')
    const [arrayString, setArrayString] = useState([])
    const [start, setStart] = useState(false)
    const [indexString, setIndexString] = useState(-1)
    const [stringRead, setStringRead] = useState('')
    const [showAccept, setShowAccept] = useState(false)
    const [showReject, setShowReject] = useState(true)
    const [stepReads, setStepReads] = useState([])
    const handleChangeInput = (e) => {
        let string = e.target.value
        let array = string.split('')
        let check = true
        array.forEach(char => {
            if (automata && automata.alphabets) {
                if (!automata.alphabets.includes(char)) {
                    alert(`Alphabets does not include the letter ${char}.`)
                    check = false
                }
            }
        })
        if (check) {
            setText(string)
            setArrayString(array)
        }
        setShowAccept(false)
        setShowReject(true)
        setStart(false)
    }
    const fromListIdToNodeLabel = (listId = []) => {
        let nodeLabels = listId.map(id => {
            let nodeLabel = document.getElementById(id + SUFFIX_NODE_LABEL)
            if (nodeLabel) {
                return nodeLabel.textContent
            }
        })
        return nodeLabels
    }
    const fromIdToNodeLabel = (id) => {
        let nodeLabel = document.getElementById(id + SUFFIX_NODE_LABEL)
        if (nodeLabel) {
            return nodeLabel.textContent
        }
        return null
    }
    const handleStart = () => {
        if (typeAutomata == 'nfaEpsilon') {
            let epsilonClosure = getEpsilonClosure(automata.initial_state, automata.transition_function)
            let nodeLabels = fromListIdToNodeLabel(epsilonClosure)
            setStepReads([...stepReads, nodeLabels])
            setNodeAfterRead(epsilonClosure)
        } else if (typeAutomata == 'dfa') {
            setNodeAfterRead([automata.initial_state])
            setStepReads([...stepReads, [fromIdToNodeLabel(automata.initial_state)]])
        }

        setStart(true)
        setShowAccept(false)
        setShowReject(true)
    }
    const handleStop = () => {
        setStart(false)
        setIndexString(-1)
        setNodeAfterRead([])
        setStepReads([])
    }
    const handleSepback = () => {
        let nextIndex = indexString - 1
        setIndexString(nextIndex)
        setStringRead(text.slice(0, nextIndex - 1))
        let stepReadsCopy = [...stepReads]
        stepReadsCopy.pop()
        stepReadsCopy.pop()
        setStepReads([...stepReadsCopy])
    }
    const handleReadNext = () => {
        let nextIndex = indexString + 1
        setIndexString(nextIndex)
        setStringRead(text.slice(0, nextIndex + 1))
    }
    const handleReadAll = () => {
        if (typeAutomata == 'nfaEpsilon') {
            let states = stringAcceptByNfaEpsilon(text, automata)
            if (text.length) {
                if (states) {
                    let check = false
                    states.forEach(state => {
                        if (automata.final_states.includes(state)) {
                            check = true
                        }
                    })
                    setShowAccept(check)
                    setShowReject(check)
                }
            }
            setNodeAfterRead(states)
        } else if (typeAutomata == 'dfa') {
            let states = stringAcceptByDfa(stringRead, automata)
            if (text.length === stringRead.length) {
                if (states) {
                    let check = false
                    states.forEach(state => {
                        if (automata.final_states && automata.final_states.includes(state)) {
                            check = true
                        }
                    })
                    setShowAccept(check)
                    setShowReject(check)
                }
            }
            setNodeAfterRead(states)
        }
    }

    const stringAcceptByNfaEpsilon = (string, nfaEpsilon) => {
        let preResult = getEpsilonClosure(nfaEpsilon.initial_state, nfaEpsilon.transition_function)
        for (let i = 0; i < string.length; i++) {
            let alphabet = string[i]
            if (preResult) {
                let listTotal = []
                preResult.forEach(state => {
                    let listStateAfterReadAlphabet = nfaEpsilon.transition_function[state][alphabet]
                    listTotal = [...listTotal, ...listStateAfterReadAlphabet]
                })
                if (listTotal) {
                    let listClosureOfManyState = []
                    listTotal.forEach(state => {
                        let closeEachState = getEpsilonClosure(state, nfaEpsilon.transition_function)
                        listClosureOfManyState = [...listClosureOfManyState, ...closeEachState]
                    })
                    preResult = listClosureOfManyState
                }
            }
        }
        return preResult
    }

    const stringAcceptByDfa = (string, dfa) => {
        let preResult = [dfa.initial_state]
        for (let i = 0; i < string.length; i++) {
            let alphabet = string[i]
            if (preResult) {
                let listTotal = []
                preResult.forEach(state => {
                    let stateAfterReadAlphabet = dfa.transition_function[state][alphabet]
                    if (stateAfterReadAlphabet != 'phi') {
                        listTotal = [...listTotal, stateAfterReadAlphabet]
                    }
                })
                preResult = [...listTotal]
            }
        }
        return preResult
    }

    useEffect(() => {
        if (typeAutomata == 'nfaEpsilon') {
            let states = stringAcceptByNfaEpsilon(stringRead, automata)
            if (text.length === stringRead.length) {
                if (states) {
                    let check = false
                    states.forEach(state => {
                        if (automata.final_states.includes(state)) {
                            check = true
                        }
                    })
                    setShowAccept(check)
                    setShowReject(check)
                }
            }
            if (states) {
                let listLabel = fromListIdToNodeLabel(states)
                setStepReads([...stepReads, listLabel])
                setNodeAfterRead(states)
            }
        } else if (typeAutomata == 'dfa') {
            let states = stringAcceptByDfa(stringRead, automata)
            if (text.length === stringRead.length) {
                if (states) {
                    let check = false
                    states.forEach(state => {
                        if (automata.final_states && automata.final_states.includes(state)) {
                            check = true
                        }
                    })
                    setShowAccept(check)
                    setShowReject(check)
                }
            }
            if (states) {
                let listLabel = fromListIdToNodeLabel(states)
                if (listLabel[0]) {
                    setStepReads([...stepReads, listLabel])
                }
                setNodeAfterRead(states)
            }
        }
    }, [stringRead])

    let stepReadForNFAEpsilon = stepReads.map((listLabels, index) => {
        if (index == 0) {
            return <div key={index}>
                {/* <div>{`- Step ${index + 1}:`}</div> */}
                {` ε-CLOSURE(${fromIdToNodeLabel(automata.initial_state)}) = ${listLabels}`}
            </div>
        }
        return <div key={index}>
            {/* <div>{`- Step ${index + 1}:`}</div> */}
            {`ε-CLOSURE(δ({${stepReads[index - 1]}}, ${text[index - 1]})) = ${listLabels.length ? listLabels : '{}'}`}
        </div>
    })

    let stepReadForDFA = stepReads.map((listLabels, index) => {
        if (index == 0) {
            return <div key={index}>
                {/* <div>{`- Step ${index + 1}:`}</div> */}
                {` Start = ${listLabels}`}
            </div>
        }
        return <div key={index}>
            {/* <div>{`- Step ${index + 1}:`}</div> */}
            {`δ({${stepReads[index - 1]}, ${text[index - 1]})) = ${listLabels.length ? listLabels : '{}'}`}
        </div>
    })

    return (
        <div className={styles.toolRead}>
            <input className={styles.input}
                value={text}
                onChange={handleChangeInput}
                placeholder='Chuỗi...'
            />
            <div className={styles.arrayString}>
                {
                    arrayString.map((character, index) => {
                        return <span className={indexString == index ? styles.indexStringCurrent : ''}
                            key={index}>
                            {character}
                        </span>
                    })
                }
                {showAccept && start && <span className={styles.marginLeft}>true</span>}
                {!showReject && start && <span className={styles.marginLeft}>false</span>}
            </div>
            <div className={styles.listBtns}>
                {
                    !start && <button
                        onClick={handleStart}
                    >
                        Bắt đầu
                    </button>
                }
                {
                    start &&
                    <button
                        onClick={handleStop}
                    >
                        Dừng
                    </button>
                }
                {
                    start && <button onClick={handleSepback}>
                        <FontAwesomeIcon className={styles.iconMarginRight} icon={faBackward} />
                        Bước trước
                    </button>
                }
                {
                    start && <button
                        onClick={handleReadNext}
                    >
                        Đọc kí tự tiếp theo
                        <FontAwesomeIcon className={styles.iconMarginLeft} icon={faForward} />
                    </button>
                }
                {
                    start && <button
                        onClick={handleReadAll}
                    >
                        Đọc tất cả
                    </button>
                }
            </div>
            <div>
                {
                    typeAutomata == 'nfaEpsilon' && stepReads.length > 0
                        ?
                        stepReadForNFAEpsilon
                        :
                        stepReadForDFA
                }
            </div>
        </div >
    )
}
export default ToolRead