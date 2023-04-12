import { ToolCard } from "./ToolCard";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useMemo, useState } from "react";
import { buildings } from "../data";

export const BuildingByNumber = () => {
    const [number, setNumber] = useState<number>();

    const handleChange = (input: string) => {
        if (input.length) {
            setNumber(Number(input));
        } else {
            setNumber(undefined)
        }

    }

    const getBuilding = useMemo(() => {
        const building = buildings.find(b => b.number === Number(number));
        if (number === undefined || building === undefined) {
            return ''
        } else {
            return building.name
        }
    }, [number])

    const result = getBuilding

    const error = !!number && !result.length

    return <ToolCard title={"Find building"}>
        <Col>
            <InputGroup>
                <InputGroup.Text id="building-number-addon">Number</InputGroup.Text>
                <Form.Control type="number" aria-label="Building number" aria-describedby="building-number-addon"
                    onChange={e => handleChange(e.target.value)} value={number} />
                <Button variant="primary">Search</Button>
            </InputGroup>
            <InputGroup>
                <InputGroup.Text id="building-number-result-addon">Building</InputGroup.Text>
                <Form.Control readOnly isInvalid={error} aria-label="Building" aria-describedby="building-number-result-addon" value={error ? `Building ${number} does not exist.` : result} />
            </InputGroup>
        </Col>
    </ToolCard>
}
