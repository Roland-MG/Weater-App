import { useRef } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, InputGroup } from "react-bootstrap";
import { setCity } from "../store/slices/citySlice";

function SearchForm() {
    const dispatch = useDispatch();
    const inputRef = useRef();

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(setCity(inputRef.current.value));
        },
        [dispatch]
    );

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3 w">
                <Form.Control
                    ref={inputRef}
                    placeholder="City"
                    aria-label="City"
                    aria-describedby="basic-addon2"
                />
                <Button
                    className="fs-6"
                    variant="outline-primary"
                    id="button-addon2"
                    type="submit">
                    🔍
                </Button>
            </InputGroup>
        </Form>
    );
}

export default SearchForm;
