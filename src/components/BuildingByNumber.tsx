import {ToolCard} from "./ToolCard";
import {Button, Col, Form, InputGroup} from "react-bootstrap";
import React, {useMemo, useState} from "react";
import {Building, buildings} from "../data";


export const BuildingByNumber = () => {
    const [number, setNumber] = useState<number>();
    const [abbreviation, setAbbreviation] = useState<string>();

    const handleNumberChange = (input: string) => {
        if (input.length) {
            setNumber(Number(input));
        } else {
            setNumber(undefined)
        }
    }

    const handleAbbreviationChange = (input: string) => {
        if (input.length) {
            setAbbreviation(input.toUpperCase());
        } else {
            setAbbreviation(undefined)
        }
    }

    const numberResult = useMemo(() => {
        const building = buildings.find(b => b.number === number);
        if (number === undefined || building === undefined) {
            return ''
        } else {
            return building.name
        }
    }, [number])

    const abbreviationResult = useMemo(() => {
        const building = buildings.find(b => b.abbreviation === abbreviation);
        if (abbreviation === undefined || building === undefined) {
            return ''
        } else {
            return building.name
        }
    }, [abbreviation])

    const numberError = !!number && !numberResult.length
    const abbreviationError = !!abbreviation && !abbreviationResult.length

    return <ToolCard title={"Find building"}>
        <Col>
            <InputGroup className="mt-2">
                <InputGroup.Text id="building-number-addon">Number</InputGroup.Text>
                <Form.Control type="number" aria-label="Building number" aria-describedby="building-number-addon"
                              onChange={e => handleNumberChange(e.target.value)} value={number}/>
                <Button variant="primary">Search</Button>
            </InputGroup>
            <InputGroup className="mt-2">
                <InputGroup.Text id="building-number-result-addon">Building</InputGroup.Text>
                <Form.Control readOnly isInvalid={numberError} aria-label="Building"
                              aria-describedby="building-number-result-addon"
                              value={numberError ? `Building ${number} does not exist.` : numberResult}/>
            </InputGroup>
            <hr />
            <InputGroup className="mt-2">
                <InputGroup.Text id="building-abbreviation-addon">Abbreviation</InputGroup.Text>
                <Form.Control type="text" aria-label="Building abbreviation"
                              aria-describedby="building-abbreviation-addon"
                              onChange={e => handleAbbreviationChange(e.target.value)} value={abbreviation}/>
                <Button variant="primary">Search</Button>
            </InputGroup>
            <InputGroup className="mt-2">
                <InputGroup.Text id="building-abbreviation-result-addon">Building</InputGroup.Text>
                <Form.Control readOnly isInvalid={abbreviationError} aria-label="Building"
                              aria-describedby="building-abbreviation-result-addon"
                              value={abbreviationError ? `Building ${abbreviation} does not exist.` : abbreviationResult}/>
            </InputGroup>
        </Col>
    </ToolCard>
}
