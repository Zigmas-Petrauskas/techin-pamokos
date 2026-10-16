// Vartotojo kortelės komponentas.
function UserCard() {
  return (
    <section className="text-gray-600">
      <img
        src="/Zigmas.webp"
        alt="Zigmo profilio nuotrauka"
        className="mb-2 h-32 w-32 rounded-full object-cover"
      />

      <h2 className="text-sm font-light">Zigmas Petrauskas</h2>
    </section>
  );
}

export default UserCard;
