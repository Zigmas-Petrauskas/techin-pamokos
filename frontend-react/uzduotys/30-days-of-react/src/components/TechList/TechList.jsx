// Technologijų sąrašo komponentas.
function TechList() {
  const technologies = ['HTML', 'CSS', 'JavaScript', 'React.js'];

  const firstNumber = 3;
  const secondNumber = 2;
  const age = 47;

  return (
    <section className="mb-3 text-sm text-gray-600">
      <p>
        Technologijos, reikalingos pradedant mokytis <strong>React.js</strong>:
      </p>

      <ul>
        {technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>

      <p className="mt-1">
        {firstNumber} + {secondNumber} = {firstNumber + secondNumber}
      </p>

      <p>
        Esu Zigmas Petrauskas. Man {age} metai. Mėgstu React ir džiaugiuosi galėdamas dalyvauti „30
        React dienų“ iššūkyje.
      </p>
    </section>
  );
}

export default TechList;
