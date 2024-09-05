import FormContainer from './FormContainer.jsx';

export default function Main(props) {
  const { addUser } = props;
  return (
    <div className="products-container">
      <FormContainer addUser={addUser}/>
    </div>
  );
}
