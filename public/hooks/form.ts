import React, {useState} from "react";

export const useForm = <T>(callback: any, initialState: T) => {
    const [values, setValues] = useState<T>(initialState);
    const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setValues({
            ...values, [event.target.name]:
            event.target.value
        });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await callback(); // triggering the callback
    };

    return {
        onChange,
        onSubmit,
        values,
    };
}