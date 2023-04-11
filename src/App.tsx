import React from 'react';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import {ToolCard} from "./components/ToolCard";
import {BuildingByNumber} from "./components/BuildingByNumber";

function App() {
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                        <BuildingByNumber />
                    </Col>
                    <Col><ToolCard title={"Test"}>Test</ToolCard></Col>
                    <Col><ToolCard title={"Test"}>Test</ToolCard></Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
