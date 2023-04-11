import React from "react";
import {Card} from "react-bootstrap";

type Props = {
    title: string
    children?: React.ReactNode
}

export const ToolCard: React.FC<Props> = ({title, children}) => {
    return <Card>
        <Card.Body>
            <Card.Title style={{fontSize: 30}}>{title}</Card.Title>
            {children}
        </Card.Body>
    </Card>
};
