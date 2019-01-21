import React from "react";
import axios from "./axios";

type Props = {
    data: Item[];
    setUpdate: (b: boolean) => void;
};

const List: React.FunctionComponent<Props> = (props: Props) => {
    const del = (item: string) => {
        axios.delete(`expenses/${item}.json`).then(() => {
            props.setUpdate(true);
        });
    };

    return (
        <ul>
            {props.data &&
                props.data.map(item => (
                    <li key={item.id}>
                        {item.name} | {item.price}{" "}
                        <button onClick={() => del(item.id)}>Delete</button>
                    </li>
                ))}
        </ul>
    );
};

export default List;
