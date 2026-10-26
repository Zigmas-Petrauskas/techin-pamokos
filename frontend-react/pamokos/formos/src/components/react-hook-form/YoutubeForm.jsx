import { useForm } from "react-hook-form";

function YoutubeFrom() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      cahnnel: "",
      favColor: null, // nepasirinkta spalva
      hobbies: [],
    },
  });
  //formos duomenys yra objektas
  const formSubmitHandler = (formDataObject) => {
    console.log(formDataObject);
  };

  const { username, email, hobbies } = watch();

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} noValidate>
      <div>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          className="border"
          {...register("username")}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          className="border"
          {...register("email")}
        />
      </div>

      <div>
        <label>
          Favorite Channel
          <br />
          <select className="border" {...register("channel")}>
            <option value="">-- Select a channel --</option>
            <option value="Code with Ania Kubow">Code with Ania Kubow</option>
            <option value="Kevin Powell">Kevin Powell</option>
            <option value="Net Ninja">Net Ninja</option>
          </select>
        </label>
      </div>

      <div>
        <div>Choose your favorite color:</div>
        <label>
          <input
            type="radio"
            value="red"
            className="border"
            {...register("favColor")}
          />
          Red
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="favColor"
            value="green"
            className="border"
          />
          Green
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="blue"
            className="border"
            {...register("favColor")}
          />
          Blue
        </label>
      </div>

      <div>
        <div>Select your hobbies:</div>
        <label>
          <input
            type="checkbox"

            value="Reading"
            className="border"
            {...register("hobbies")}
          />
          Reading
        </label>
        <br />
        <label>
          <input
            type="checkbox"

            value="Traveling"
            className="border"
            {...register("hobbies")}
          />
          Traveling
        </label>
        <br />
        <label>
          <input
            type="checkbox"

            value="Cooking"
            className="border"
            {...register("hobbies")}
          />
          Cooking
        </label>
      </div>

      <input type="submit" value="Submit" />

      {/* Stebimos formos laukų reikšmės. */}
      <div className="mt-4">
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Hobbies: {hobbies.join(", ")}</p>
      </div>
    </form>
  );
}

export default YoutubeFrom;
