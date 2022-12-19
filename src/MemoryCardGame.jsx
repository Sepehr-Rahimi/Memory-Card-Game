import { useEffect, useState } from "react"
import clsx from 'clsx'

const MemoryCardGame = ({mainInput}) => {
    const [data,setData] = useState(mainInput.sort(() => Math.random() -0.5))
    const [firstChoice,setFirstChoice] = useState(null)
    const [secondChoice,setSecondChoice] = useState(null)
    const [guessedCount,setGuessedCount] = useState(0)
    const [doReset,setDoReset] = useState(false)
    
    useEffect(() => {
            const newData = data.map((d) => ({...d,isHidden:true}))
            setTimeout(() => {
                    setData(newData)
                },4000)
            },[doReset])



    useEffect(() => {
        if (firstChoice && secondChoice) {
            if (firstChoice.code === secondChoice.code){
                setFounded(firstChoice.id,secondChoice.id)
                setFirstChoice(null)
                setSecondChoice(null)
                setGuessedCount((count) => count + 2 )
            }
            else {
                if (firstChoice && secondChoice) {
                    setTimeout(() => {
                        toggleHidden(firstChoice.id,secondChoice.id)
                        setFirstChoice(null)
                        setSecondChoice(null)
                    }, 500);
                }
            }
        }
    },[secondChoice,firstChoice])



    const toggleHidden = (selectedId1,selectedId2) => {
        const newData = data.slice()
        const selectedPic1 = data.find((d) => d.id === selectedId1)
        const index1 = data.indexOf(selectedPic1)
        const newSelectedPic1 = {...selectedPic1,isHidden:!selectedPic1.isHidden}
        newData.splice(index1,1,newSelectedPic1)
        if (selectedId2){
            const selectedPic2 = data.find((d) => d.id === selectedId2)
            const index2 = data.indexOf(selectedPic2)
            const newSelectedPic2 = {...selectedPic2,isHidden:!selectedPic2.isHidden}
            newData.splice(index2,1,newSelectedPic2)
        }
        setData(newData)
    }


    const setFounded = (selectedId1,selectedId2) => {
        const selectedPic1 = data.find((d) => d.id === selectedId1)
        const index1 = data.indexOf(selectedPic1)
        const newSelectedPic1 = {...selectedPic1,isFounded:true}
        const selectedPic2 = data.find((d) => d.id === selectedId2)
        const index2 = data.indexOf(selectedPic2)
        const newSelectedPic2 = {...selectedPic2,isFounded:true}
        const newData = data.slice()
        newData.splice(index1,1,newSelectedPic1)
        newData.splice(index2,1,newSelectedPic2)
        setData(newData)
    }

    const handleChoice = (selectedPic) => {
        if(!firstChoice) {
            setFirstChoice(selectedPic)
        }
        else if(firstChoice && !secondChoice &&(firstChoice.id !== selectedPic.id)) {
            setSecondChoice(selectedPic)
        }
        else if (firstChoice && firstChoice.id === selectedPic.id ) {
            setFirstChoice(null)
        }
    }


    const reset = () => {
        setFirstChoice(null)
        setSecondChoice(null)
        setGuessedCount(0)
        setData(mainInput.sort(() => Math.random() -0.5))
        setDoReset(!doReset)
    }
            
            
            
    const ShowData = ({input}) => {        
        


        return(
            <div onClick={() => {
                if(!input.isFounded){
                    handleChoice(input)
                    toggleHidden(input.id)
                }
                }} className={`w-40 h-full max-h-80 border-2 border-slate-300 bg-slate-300 rounded-md min-h-xs ${clsx({'border-green-600':input.isFounded})}`}>
                <img className={`w-40 h-full rounded-md ${clsx({'hidden':input.isHidden})} `} src={input.picUrl} alt={input.name} />
            </div>
        )
    }



    const ShowResult = () => {
        return(
            <div className=" flex justify-between items-center border-b-2 border-slate-400 w-4/5 mx-auto p-1 m-1 max-w-2xl">
                <span>
                    <span>You reached : </span>
                    <span>{guessedCount}</span>
                    <span>/</span>
                    <span>{data.length}</span>
                </span>
                <button onClick={reset} className="border-2 border-slate-400 rounded-lg px-2 hover:scale-95 active:bg-black active:text-white">Reset</button>
            </div>
        )
    }


    return(
        <div className="flex flex-col">
            <ShowResult />
            <div className="grid grid-rows-4 h-screen max-h-screen grow grid-cols-4 gap-2 mx-auto max-w-2xl p-1 ">
                {data.map((picDetail) => {
                    return(
                        <ShowData key={picDetail.id} input={picDetail} />
                    )
                })}
            </div>
            <div className={`flex flex-col absolute top-0 w-screen bg-green-400 h-full opacity-80 items-center justify-center ${clsx({'hidden':guessedCount !== data.length})}`}>
                <div className={`flex  text-6xl justify-center items-center `}>You won the game</div>
                <button className="border-2 border-black rounded-lg px-2 m-3 hover:scale-95 active:bg-black active:text-white w-28" onClick={reset}>Reset</button>
            </div>
        </div>
    )
}


export default MemoryCardGame