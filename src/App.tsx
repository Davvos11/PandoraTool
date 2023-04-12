import React, { useState } from 'react';
import './App.css';
import { Col, Container, Row } from "react-bootstrap";
import { BuildingByNumber } from "./components/BuildingByNumber";
import { LocationByLetters } from "./components/LocationByLetters";
import { CampusMap } from './components/CampusMap';
import { MapModal } from './components/MapModal';

function App() {
    const [showMap, setShowMap] = useState(false);
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <BuildingByNumber />
                        <br /> {/* <br /> go brrrr */}
                        <CampusMap setShowMap={setShowMap} />
                    </Col>
                    <Col xs={12} md={6}>
                        <LocationByLetters />
                    </Col>
                </Row>
            </Container>
            <MapModal show={showMap} setShow={setShowMap} />
        </div>
    );
}

export default App;
