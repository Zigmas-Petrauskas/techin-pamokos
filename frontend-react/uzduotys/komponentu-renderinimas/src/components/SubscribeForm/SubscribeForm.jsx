import './SubscribeForm.css';

// Prenumeratos formos komponentas.
function SubscribeForm() {
  return (
    <section className="subscribe">
      <h1>Prenumerata</h1>

      <p className="subscribe-description">
        Užsiprenumeruokite mūsų naujienas ir gaukite naujausią informaciją el. paštu.
      </p>

      <form className="subscribe-form">
        <input type="text" name="firstName" placeholder="Vardas" aria-label="Vardas" />

        <input type="text" name="lastName" placeholder="Pavardė" aria-label="Pavardė" />

        <input type="email" name="email" placeholder="El. paštas" aria-label="El. paštas" />

        <button type="button">Prenumeruoti</button>
      </form>
    </section>
  );
}

export default SubscribeForm;
