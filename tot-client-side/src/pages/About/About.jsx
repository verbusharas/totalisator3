import {fetchTotalisators} from "../../api/totalisatorApi";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTotalisator, clearTotalisator} from "../../store/slices/totalisatorSlice";
import useTotalisator from "../../hooks/useTotalisator";

export default () => {

    const [totalisatorList, setTotalisatorList] = useState([]);

    const dispatch = useDispatch();
    const totalisator = useTotalisator();

    useEffect(()=>{
        fetchTotalisators().then(res=>{
            setTotalisatorList(res.data)
        });
    }, [])


    const render = (totalisator) => {
        return (
            <p>{totalisator.title}</p>
        )
    }

    return (
        <main>
            <section className="graph-section">
            </section>
            <section className="form-section">
                <h2>About the Webpage (state)</h2>
                {totalisatorList.map(t=>render(t))}
                {totalisator &&
                <>
                    <h2>About the Webpage (redux)</h2>
                    <p>SELECTED: {totalisator.title}</p>
                    <p>SELECTED: {totalisator.players[1]?.name}</p>
                </>
                }

            </section>

        </main>
    )
}




