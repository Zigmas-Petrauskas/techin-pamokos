import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaYoutube } from "./form_validation_schema";
import postData from "../../services/post";

function YoutubeFrom() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    getValues, // Nuskaito formos lauko reikšmę.
    trigger, // Paleidžia formos lauko validaciją.
  } = useForm({
    mode: "onBlur", // Laukai validuojami praradus fokusą.
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      favColor: null, // Nepasirinkta spalva.
      hobbies: [],
      password: "",
      confirmPassword: "",
    },

    // Resolver prijungia Zod prie React Hook Form.
    resolver: zodResolver(schemaYoutube),
  });

  // Formos duomenis apdorojamti funkcija
  const formSubmitHandler = async (formDataObject) => {
    await postData(formDataObject);
    reset();
  };

  // Realiu laiku stebimos formos laukų reikšmės.
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
        <div className="text-red-500">{errors.username?.message}</div>
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
        <div className="text-red-500">{errors.email?.message}</div>
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
        <div className="text-red-500">{errors.channel?.message}</div>
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
            value="green"
            className="border"
            {...register("favColor")}
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
        <div className="text-red-500">{errors.favColor?.message}</div>
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
        <div className="text-red-500">{errors.hobbies?.message}</div>
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          className="border"
          {...register("password", {
            onChange: () => {
              // Keičiant slaptažodį, pertikrinamas ir jo patvirtinimas.
              if (getValues("confirmPassword")) trigger("confirmPassword");
            },
          })}
        />
        <div className="error text-red-500">{errors.password?.message}</div>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <br />
        <input
          type="password"
          id="confirmPassword"
          className="border"
          {...register("confirmPassword")}
        />
        <div className="error text-red-500">
          {errors.confirmPassword?.message}
        </div>
      </div>

      <input type="submit" value="Submit" className="mt-2 bg-blue-300 p-1" />

      {/* Stebimos formos laukų reikšmės. */}
      <div className="mt-4 font-medium">Form data:</div>
      <div className="mt-2">
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Hobbies: {hobbies.join(", ")}</p>
      </div>
    </form>
  );
}

export default YoutubeFrom;
