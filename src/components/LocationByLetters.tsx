import {ToolCard} from "./ToolCard";
import {Alert, Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Artwork, artworks, Building, buildings} from "../data";
import style from "./LocationByLetters.module.css";

const includes = (letters: string[], word: string) => {
    const wordLetters = word.toLowerCase().split('')

    return letters.map(letter => {
        const inQuery = letters.filter(l => l === letter).length;
        const inWord = wordLetters.filter(l => l === letter).length;
        return inQuery <= inWord;
    }).every(e => e)
}

const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<boolean>>) =>
    setter(e.target.checked);

export const LocationByLetters = () => {
    const [letters, setLetters] = useState<string>("");

    const [buildingNames, setBuildingNames] = useState<Building[]>([]);
    const [buildingTranslations, setBuildingTranslations] = useState<Building[]>([]);
    const [artworkNames, setArtworkNames] = useState<Artwork[]>([]);
    const [artworkTranslations, setArtworkTranslations] = useState<Artwork[]>([]);

    const [searchBN, setSearchBN] = useState<boolean>(true); /*Building Name*/
    const [searchBT, setSearchBT] = useState<boolean>(false); /*Building Translation*/
    const [searchAN, setSearchAN] = useState<boolean>(true); /*Artwork Name*/
    const [searchAT, setSearchAT] = useState<boolean>(false); /*Artwork Translation*/

    useEffect(() => {
        if (letters === undefined || letters === "") {
            setBuildingNames([]);
            setBuildingTranslations([]);
            setArtworkNames([])
            setArtworkTranslations([])
            return;
        }

        const letterArray = letters.toLowerCase().split('');

        if (searchBN) {
            setBuildingNames(buildings.filter(b => {
                return includes(letterArray, b.name)
            }));
        }
        if (searchBN) {
            setArtworkTranslations(buildings.filter(b => {
                return includes(letterArray, b.translation)
            }));
        }
        if (searchAN) {
            setArtworkNames(artworks.filter(a => {
                return includes(letterArray, a.name)
            }));
        }
        if (searchAT) {
            setArtworkTranslations(artworks.filter(a => {
                return includes(letterArray, a.translation)
            }));
        }

    }, [letters, searchBN, searchBT, searchAN, searchAT])

    return <ToolCard title={"Find location with"}>
        <Col style={{textAlign: "left"}}>
            <InputGroup>
                <InputGroup.Text id="location-letters-addon">Letters</InputGroup.Text>
                <Form.Control aria-label="Building number" aria-describedby="location-letters-addon"
                              onChange={e => setLetters(e.target.value)} value={letters}/>
                <Button variant="primary">Search</Button>
            </InputGroup>
            <Form>
                <Form.Check id="check-bn" label="Building names" checked={searchBN}
                            onChange={e => handleCheckbox(e, setSearchBN)}/>
                <Form.Check id="check-bt" label="Building translations" checked={searchBT}
                            onChange={e => handleCheckbox(e, setSearchBT)}/>
                <Form.Check id="check-an" label="Artwork names" checked={searchAN}
                            onChange={e => handleCheckbox(e, setSearchAN)}/>
                <Form.Check id="check-at" label="Artwork translations" checked={searchAT}
                            onChange={e => handleCheckbox(e, setSearchAT)}/>
            </Form>
            <div className={style.results}>
                {searchBN ?
                    <><b>Buildings:</b>
                        <ul>
                            {buildingNames.map(b => <li>{b.name}</li>)}
                        </ul>
                    </> : null}
                {searchBT ?
                    <><b>Building translations:</b>
                        <ul>
                            {buildingTranslations.map(b => <li>{b.name}<br/><i>({b.translation})</i></li>)}
                        </ul>
                    </> : null}
                {searchAN ?
                    <><b>Artworks:</b>
                        <ul>
                            {artworkNames.map(a => <li>{a.name}</li>)}
                        </ul>
                    </> : null}
                {searchAT ?
                    <><b>Artwork translations:</b>
                        <ul>
                            {artworkTranslations.map(a => <li>{a.name}<br/><i>({a.translation})</i></li>)}
                        </ul>
                    </> : null}
            </div>
        </Col>
    </ToolCard>
}
