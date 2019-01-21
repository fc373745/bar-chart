import React, { useEffect, useState } from "react";
import axios from "./axios";

import List from "./List";
import Add from "./Add";
import BarChart from "./BarChart";

const Container: React.FunctionComponent = () => {
    const [data, updateData] = useState<Item[]>([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (data.length < 1 || update) {
            axios.get("expenses.json").then(res => {
                const arr = makeArr(res.data);
                updateData(arr);
                setUpdate(false);
            });
        }
    });

    const makeArr = (obj: Data) => {
        const arr = Object.keys(obj).map(item => {
            return {
                id: item,
                name: obj[item].name,
                price: obj[item].price
            };
        });
        return arr;
    };

    return (
        <div>
            <BarChart data={data} />
            <List data={data} setUpdate={setUpdate} />
            <Add setUpdate={setUpdate} />
        </div>
    );
};

export default Container;
