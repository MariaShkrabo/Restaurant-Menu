import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useContext, useState, useEffect } from "react";
import {Context} from "../../index";
import { fetchCategory } from "../../http/dishAPI";
import { observer } from "mobx-react-lite";
import { createDish } from "../../http/dishAPI";
import { dishValidation } from "../../validation/dish";

const CreateDish = observer(({show, onHide}) => {
    const {dish} = useContext(Context);
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        fetchCategory().then(data => dish.setCategories(data));
    }, [])

    const addDish = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('picture', file);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('categoryId', dish.selectedCategory.id);
        createDish(formData).then(data => onHide());
        dishValidation(name, file, description, quantity, price, dish.selectedCategory.id);
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
                Добавить блюдо
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>{dish.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {dish.categories.map(category =>
                            <Dropdown.Item
                                onClick={() => dish.setSelectedCategory(category)}
                                key={category.id}
                            >
                                {category.name}
                            </Dropdown.Item>
                        )}   
                     </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                className="mt-3"
                placeholder={"Введите название блюда"}
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Form.Control
                className="mt-3"
                type="file"
                onChange={selectFile}
            /> 
            </Form>
            <Form.Control
                className="mt-3"
                placeholder={"Введите описание блюда"}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <Form.Control
                className="mt-3"
                placeholder={"Введите количество блюда в граммах"}
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
            />
            <Form.Control
                className="mt-3"
                placeholder={"Введите стоимость блюда"}
                value={price}
                onChange={e => setPrice(e.target.value)}
            />           
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            <Button variant="outline-success" onClick={addDish}>Добавить</Button>
        </Modal.Footer>
        </Modal>
    );
});

export default CreateDish;