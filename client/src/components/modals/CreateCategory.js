import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import { createCategory } from "../../http/dishAPI";
import { categoryValidation } from "../../validation/category";

const CreateCategory = ({show, onHide}) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addCategory = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('picture', file);
        createCategory(formData).then(data => onHide());
        categoryValidation(name, file);
    }

    return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Добавить категорию
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    className="mt-3"
                    placeholder={"Введите название категории"}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="outline-success" onClick={addCategory}>Добавить</Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;