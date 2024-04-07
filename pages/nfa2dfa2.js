
import styles from './nfa2dfa.module.scss'
import { useEffect, useState } from 'react';
import Header from '../component/header';
import { useDispatch } from 'react-redux';
import headerActions from '../redux/action/headerActions';
import Loader from '../component/Loader';
import ToolDraw from '../component/toolDraw';
import { listLinkToTransitionFunctionForNFA } from '../utils/commonFunctions';
import api from '../api';
import ToolDisplay from '../component/toolDisplay';
import { ExplainMode } from '../component/ExplainModes/ExplainMode';
import { toast } from 'react-toastify'
import ToolRead from '../component/toolRead';

const Nfa2Dfa = () => {
    const [mode, setMode] = useState(0) // 0: force, 1: draw, 2: delete, 3: edit
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    const [widthSvg, setWidthSvg] = useState(400)
    const [heightSvg, setHeightSvg] = useState(400)
    const [finalStates, setFinalStates] = useState([])
    const [initStates, setInitStates] = useState('')
    const [radiusCircle, setRadiusCircle] = useState(30)
    const [linkLength, setLinkLength] = useState(200)
    const [dataShowDfa, setDataShowDfa] = useState({})
    const [nodeAfterRead, setNodeAfterRead] = useState([])
    const [nfa, setNfa] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        let leftElement = document.querySelector(`.${styles.left}`)
        if (leftElement) {
            setWidthSvg(leftElement.clientWidth)
            setHeightSvg(window.innerHeight - 150)
        }
    }, [])

    useEffect(() => {
        let states = nodes.map(node => {
            return node.id
        })
        let alphabets = []
        if (links) {
            links.forEach(link => {
                if (!alphabets.includes(link.label) && link.label) {
                    alphabets.push(link.label)
                }
            })
        }
        let transition_function = listLinkToTransitionFunctionForNFA(states, links)
        let nfa = {
            states: states,
            initial_state: initStates,
            final_states: finalStates,
            alphabets: alphabets,
            transition_function: transition_function
        }
        setNfa(nfa)
    }, [nodes, links, initStates, finalStates])

    let handleSubmit = async () => {
        try {

            setShowLoader(true)
            let states = nodes.map(node => {
                return node.id
            })

            let alphabets = []

            if (links) {
                links.forEach(link => {
                    if (!alphabets.includes(link.label) && link.label) {
                        alphabets.push(link.label)
                    }
                })
            }

            let transition_function = listLinkToTransitionFunctionForNFA(states, links)

            let nfa = {
                states: states,
                initial_state: initStates,
                final_states: finalStates,
                alphabets: alphabets,
                transition_function: transition_function
            }
            let response = await api.nfa2dfa(nfa)
            if (response.err) {
                console.log(response)
            } else {
                let { dfa, dataShowDfa } = response.data
                toast.success('Chuyển đổi thành công!')
                setDataShowDfa(dataShowDfa)
                setTimeout(() => {
                    document.getElementById('parentSvgDrawDfa').scrollIntoView()
                }, 500);
            }
            setShowLoader(false)
        } catch (err) {
            console.log(err)
            setShowLoader(false)
        }
    }

    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        dispatch({
            type: headerActions.SET_TITLE_HEADER,
            title: 'NFA to DFA'
        })
        dispatch({
            type: headerActions.SET_SELECT_HEADER,
            headerSelect: 'nfa2dfa'
        })
    }, [])
    return (
        <>
            <Header />
            {
                showLoader && <Loader />
            }
            <div className={styles.nfaEpsilonToNfa}>
                <div className={styles.left}>
                    <ToolDraw
                        widthSvg={widthSvg}
                        heightSvg={heightSvg}
                        mode={mode}
                        nodes={nodes}
                        setNodes={setNodes}
                        linkLength={linkLength}
                        links={links}
                        setLinks={setLinks}
                        radiusCircle={radiusCircle}
                        finalStates={finalStates}
                        setFinalStates={setFinalStates}
                        initStates={initStates}
                        setInitStates={setInitStates}
                        nodeAfterRead={nodeAfterRead}
                    />
                    <div id='parentSvgDrawDfa'>
                        {
                            dataShowDfa && <ToolDisplay
                                data={dataShowDfa}
                                widthSvg={widthSvg}
                                heightSvg={heightSvg}
                                linkLength={linkLength}
                                radiusCircle={radiusCircle}
                            />
                        }
                    </div>
                </div>
                <div className={styles.right}>
                    <ExplainMode
                        mode={mode}
                        setMode={setMode}
                    />
                    <div>
                        <button className={styles.convertButton} onClick={handleSubmit}>Chuyển đổi</button>
                    </div>

                    <div>
                        <ToolRead
                            automata={nfa}
                            typeAutomata={'nfaEpsilon'}
                            setNodeAfterRead={setNodeAfterRead}
                        />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Nfa2Dfa;