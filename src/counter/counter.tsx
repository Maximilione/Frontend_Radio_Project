import { decrement, increment, incrementByAmount , incrementAsync} from "../counter/counterSlice";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";

const Counter: React.FC = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className="counter">
            <h2>{count}</h2>
            <div>
                <button onClick={() => dispatch(increment())}>INCREMENT</button>
                <button onClick={() => dispatch(decrement())}>DECREMENT</button>
                <button onClick={() => dispatch(incrementByAmount(5))}>INCREMENT BY 5</button>
                <button onClick={() => dispatch(incrementAsync(5))}>INCREMENT ASYNC</button>
            </div>
        </div>
    );
}

export default Counter;