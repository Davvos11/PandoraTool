import { ToolCard } from "./ToolCard";
import { Col, Form, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { Artwork, artworks, Building, buildings } from "../data";
import style from "./LocationByLetters.module.css";

const includesLetters = (letters: string[], word: string) => {
    const wordLetters = word.toLowerCase().split('')

    return letters.map(letter => {
        const inQuery = letters.filter(l => l === letter).length;
        const inWord = wordLetters.filter(l => l === letter).length;
        return inQuery <= inWord;
    }).every(e => e)
}

const includesPattern = (pattern: string, word: string) => {
    return word.toLowerCase().includes(pattern.toLowerCase());
}

const matchesCondition = (letters: string, pattern: string, word: string) => {
    const hasLetters = letters !== "";
    const hasPattern = pattern !== "";
    const letterArray = letters.toLowerCase().split('');
    return (!hasLetters || includesLetters(letterArray, word)) && (!hasPattern || includesPattern(pattern, word))
}

const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(e.target.checked)
};

export const LocationByLetters = () => {
    const [letters, setLetters] = useState<string>("");
    const [pattern, setPattern] = useState<string>("");

    const [buildingNames, setBuildingNames] = useState<Building[]>([]);
    const [buildingTranslations, setBuildingTranslations] = useState<Building[]>([]);
    const [artworkNames, setArtworkNames] = useState<Artwork[]>([]);
    const [artworkTranslations, setArtworkTranslations] = useState<Artwork[]>([]);

    const [searchBN, setSearchBN] = useState<boolean>(true); /*Building Name*/
    const [searchBT, setSearchBT] = useState<boolean>(false); /*Building Translation*/
    const [searchAN, setSearchAN] = useState<boolean>(true); /*Artwork Name*/
    const [searchAT, setSearchAT] = useState<boolean>(false); /*Artwork Translation*/

    const updateLetters = (letters: string) => {
        setLetters(letters);
        updateSearch(letters, pattern)
    }

    const updatePattern = (pattern: string) => {
        setPattern(pattern);
        updateSearch(letters, pattern)
    }

    const updateSearch = (_letters: string, _pattern: string) => {
        const hasLetters = _letters !== "";
        const hasPattern = _pattern !== "";
        setLetters(_letters);
        if (!hasLetters && !hasPattern) {
            setBuildingNames([]);
            setBuildingTranslations([]);
            setArtworkNames([])
            setArtworkTranslations([])
            return;
        }

        setBuildingNames(buildings.filter(b => {
            return matchesCondition(_letters, _pattern, b.name)
        }));
        setBuildingTranslations(buildings.filter(b => {
            return matchesCondition(_letters, _pattern, b.translation)
        }));
        setArtworkNames(artworks.filter(a => {
            return matchesCondition(_letters, _pattern, a.name)
        }));
        setArtworkTranslations(artworks.filter(a => {
            return matchesCondition(_letters, _pattern, a.translation)
        }));
    }

    const renderBuildings = () => {
        const allNames: Building[] = [];
        if (searchBN) {
            allNames.push(...buildingNames)
        }
        if (searchBT) {
            allNames.push(...buildingTranslations)
        }
        const union = Array.from(new Set(allNames))
        return <>{union.map(b => <li>{b.name}<br /> {searchBT && (<i>({b.translation})</i>)}</li>)}</>
    }

    const renderArtworks = () => {
        const allNames: Artwork[] = [];
        if (searchAN) {
            allNames.push(...artworkNames)
        }
        if (searchAT) {
            allNames.push(...artworkTranslations)
        }
        const union = Array.from(new Set(allNames))
        return <>{union.map(b => <li>{b.name}<br /> {searchAT && (<i>({b.translation})</i>)}</li>)}</>
    }

    return <ToolCard title={"Find location with"}>
        <Col style={{ textAlign: "left" }}>
            <InputGroup>
                <InputGroup.Text id="location-letters-addon">Letters</InputGroup.Text>
                <Form.Control aria-label="Building number" aria-describedby="location-letters-addon"
                    onChange={e => updateLetters(e.target.value)} value={letters} />
            </InputGroup>
            <InputGroup>
                <InputGroup.Text id="location-pattern-addon">Pattern</InputGroup.Text>
                <Form.Control aria-label="Building number" aria-describedby="location-letters-addon"
                    onChange={e => updatePattern(e.target.value)} value={pattern} />
            </InputGroup>
            <Form>
                <Form.Check id="check-bn" label="Building names" checked={searchBN}
                    onChange={e => handleCheckbox(e, setSearchBN)} />
                <Form.Check id="check-bt" label="Building translations" checked={searchBT}
                    onChange={e => handleCheckbox(e, setSearchBT)} />
                <Form.Check id="check-an" label="Artwork names" checked={searchAN}
                    onChange={e => handleCheckbox(e, setSearchAN)} />
                <Form.Check id="check-at" label="Artwork translations" checked={searchAT}
                    onChange={e => handleCheckbox(e, setSearchAT)} />
            </Form>
            <div className={style.results}>
                {
                    <><b>Buildings:</b>
                        <ul>
                            {renderBuildings()}
                        </ul>
                    </>}
                {
                    <><b>Artworks:</b>
                        <ul>
                            {renderArtworks()}
                        </ul>
                    </>}
            </div>
        </Col>
    </ToolCard>
}