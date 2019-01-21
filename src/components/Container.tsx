import React, { useEffect, useState } from "react";
import axios from "./axios";

import List from "./List";
import Add from "./Add";

const Container: React.FunctionComponent = () => {
    const [data, updateData] = useState(null);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if (!data || update) {
            axios.get("expenses.json").then(res => {
                updateData(res.data);
                setUpdate(false);
            });
        }
    });

    return (
        <div>
            <List data={data} setUpdate={setUpdate} />
            <Add setUpdate={setUpdate} />
        </div>
    );
};

export default Container;
