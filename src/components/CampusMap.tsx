import { Button, Card, Image, Modal } from "react-bootstrap"
import { ToolCard } from "./ToolCard"
import { useState } from "react";

interface Props {
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>
}

export const CampusMap = ({ setShowMap }: Props) => {

  const handleShow = () => setShowMap(true);

  return <>
    <ToolCard title={'Campus map'}>
      <Image onClick={(handleShow)} src={'campus-map.jpg'} alt={'Campus map'} width={'100%'} />
    </ToolCard>
  </>
}