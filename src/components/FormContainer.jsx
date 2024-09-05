import axios from 'axios';
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const formDataObj = {
  adSoyad: '',
  email: '',
  departman: '',
  unvan: '',
  gorevler: '',
};
export default function FormContainer(props) {
  const { addUser } = props;

  const [formData, setFormData] = useState(formDataObj);

  function handleChange(e) {
    const { name, value } = e.target;
    const newState = { ...formData, [name]: value };
    setFormData(newState);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post('https://reqres.in/api/users', formData)
      .then((res) => {
        console.log(res);
        addUser(res.data);
        setFormData(formDataObj);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="adSoyad">Ad Soyad:</Label>
        <Input
          id="adSoyad"
          name="adSoyad"
          placeholder="Çalışanın tam adı ve soyadı"
          type="text"
          onChange={handleChange}
          value={formData.adSoyad}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Kurumsal email adresi"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="departman">Departman</Label>
        <Input
          id="departman"
          name="departman"
          placeholder="Çalıştığı departman"
          type="text"
          onChange={handleChange}
          value={formData.departman}
        />
      </FormGroup>
      <FormGroup>
        <Label for="unvan">Ünvan</Label>
        <Input
          id="unvan"
          name="unvan"
          placeholder="Çalışanın ünvanı"
          type="text"
          onChange={handleChange}
          value={formData.unvan}
        />
      </FormGroup>

      <FormGroup>
        <Label for="gorevler">Takım İçi Görevleri</Label>
        <Input
          id="gorevler"
          name="gorevler"
          type="textarea"
          placeholder="Çalışanın takım içerisindeki görev listesi"
          rows="8"
          onChange={handleChange}
          value={formData.gorevler}
        />
      </FormGroup>
      <Button>Kaydet</Button>
    </Form>
  );
}
