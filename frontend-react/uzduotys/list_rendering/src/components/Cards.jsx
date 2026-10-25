import employees from '../data/data.json';

// Darbuotojų kortelių komponentas.
const Cards = () => {
  return (
    <section className="cards">
      {employees.map((employee) => (
        <article
          key={employee.id}
          className={`employee-card ${employee.featured ? 'employee-card-featured' : ''}`}
        >
          <div className="employee-logo">
            <span>{employee.company}</span>
          </div>

          <div className="employee-info">
            <div className="employee-company">
              <span className="company-name">{employee.company}</span>

              {employee.new && <span className="badge-new">NEW!</span>}

              {employee.featured && <span className="badge-featured">FEATURED</span>}
            </div>

            <h2>{employee.position}</h2>

            <div className="employee-details">
              <span>{employee.postedAt}</span>
              <span>{employee.contract}</span>
              <span>{employee.location}</span>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default Cards;
