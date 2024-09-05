export default function UserList(props) {
  const { kullanicilar } = props;

  return kullanicilar.map((kullanici, index) => {
    return (
      <div key={index} className="user-item">
        {kullanici.adSoyad}
      </div>
    );
  });
}
