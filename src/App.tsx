import {Col, Container, Row} from "react-bootstrap";

import './App.css';
import {BuildingByNumber} from "./components/BuildingByNumber";
import {LocationByLetters} from "./components/LocationByLetters";

function App() {
    return (
        <div className="App">
            <Container>
                <Row className="gy-3">
                    <Col xs={12} md={6}>
                        <BuildingByNumber />
                    </Col>
                    <Col xs={12} md={6}>
                        <LocationByLetters />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
