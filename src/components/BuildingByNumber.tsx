import {ToolCard} from "./ToolCard";
import {Alert, Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {buildings} from "../data";

export const BuildingByNumber = () => {
    const [number, setNumber] = useState<number>();
    const [result, setResult] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (number === undefined) {
            setError(false);
            setResult("");
            return;
        }

        const building = buildings.find(b => b.number === number);

        if (building === undefined) {
            setResult("");
            setError(true);
        } else {
            setResult(building.name);
            setError(false);
        }
    }, [number])

    return <ToolCard title={"Find building"}>
        <Col>
            <InputGroup>
                <InputGroup.Text id="building-number-addon">Number</InputGroup.Text>
                <Form.Control type="number" aria-label="Building number" aria-describedby="building-number-addon"
                    onChange={e => setNumber(Number(e.target.value))} value={number} />
                <Button variant="primary">Search</Button>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text id="building-number-result-addon">Building</InputGroup.Text>
                <Form.Control readOnly aria-label="Building" aria-describedby="building-number-result-addon" value={result}/>
            </InputGroup>
            {error ? <Alert variant="danger">Building {number} does not exist.</Alert> : null}
        </Col>
    </ToolCard>
}
