import React from 'react';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import {ToolCard} from "./components/ToolCard";
import {BuildingByNumber} from "./components/BuildingByNumber";
import {LocationByLetters} from "./components/LocationByLetters";

function App() {
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <BuildingByNumber />
                    </Col>
                    <Col>
                        <LocationByLetters />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
