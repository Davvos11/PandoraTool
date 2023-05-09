import { Modal, Image } from "react-bootstrap"

interface Props {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export const MapModal = ({ show, setShow }: Props) => {

  const handleClose = () => setShow(false);

  return <Modal
    show={show}
    onHide={handleClose}
    fullscreen={true}
    animation={false}
  >
    <Modal.Body onClick={() => handleClose()}>
      <Image className={"modal-image"} src={'pandora_campusmap.png'} alt={'Campus map'} />
    </Modal.Body>
  </Modal>
}
