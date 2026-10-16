// Technologijų sąrašo komponentas.
function TechList() {
  const technologies = ['HTML', 'CSS', 'JavaScript'];

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
    </section>
  );
}

export default TechList;
