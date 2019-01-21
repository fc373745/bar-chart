import React, { useState } from "react";
import axios from "./axios";

type Props = {
    setUpdate: (b: boolean) => void;
};

const Add: React.FunctionComponent<Props> = (props: Props) => {
    const numbersRegex = /^[0-9]*$/;
    const [name, updateName] = useState("");
    const [price, updatePrice] = useState("");

    const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateName(e.target.value);
    };

    const setPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (numbersRegex.test(e.target.value)) {
            updatePrice(e.target.value);
        }
    };

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        axios
            .post("expenses.json", { name, price: parseInt(price) })
            .then(() => {
                props.setUpdate(true);
                updateName("");
                updatePrice("");
            });
    };

    return (
        <form>
            Name: <input value={name} onChange={setName} /> <br />
            Price: <input value={price} onChange={setPrice} />
            <button type="submit" onClick={submit}>
                Add
            </button>
        </form>
    );
};

export default Add;
