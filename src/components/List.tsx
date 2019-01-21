import React from "react";
import axios from "./axios";

type Props = {
    data: Data | null;
    setUpdate: (b: boolean) => void;
};

type Item = {
    name: string;
    price: number;
};

type Data = {
    [index: string]: Item;
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
                Object.keys(props.data).map((item: string) => {
                    return (
                        <li key={item}>
                            {props.data![item].name} | {props.data![item].price}
                            <button onClick={() => del(item)}> Delete </button>
                        </li>
                    );
                })}
        </ul>
    );
};

export default List;
