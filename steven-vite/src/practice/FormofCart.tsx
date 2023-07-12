import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";
import Toggle from "./Toggle";
type FormValues = {
  [propsName: string]: string;
}[];
type AllFormValues = {
  cusName: string;
  age: string;
  desc: string;
  carts: FormValues;
};
export default function FormofCart() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AllFormValues>({
    defaultValues: {
      cusName: "Steven",
      age: "18",
      desc: "test",
      carts: [{ name: "test", quantity: "", price: "" }],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "carts",
    control,
  });
  const onSubmit = (data: AllFormValues) => console.log(data);

  return (
    <div>
      <Toggle></Toggle>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 zIndex-10">
        <div className="shrink-0">
          <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-slate-500">You have a new message!</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-4 border-indigo-200 border-t-indigo-500">
          <input
            type="text"
            placeholder=""
            {...register("cusName", {
              required: true,
            })}
            className={errors?.cusName ? "error" : `form-input`}
          />
          <input
            type="number"
            placeholder=""
            {...register("age", {
              required: true,
            })}
            className={errors?.age ? "error" : ""}
          />
          <br />
          <textarea
            id="Desc"
            className="form-textarea"
            {...register("desc", {
              required: true,
            })}
            placeholder="description"
          ></textarea>
        </div>

        {fields.map((field, index) => {
          return (
            <div key={field.id} className="mb-2">
              <section
                className={"section grid grid-cols-4 gap-4 mt-1 "}
                key={field.id}
              >
                <input
                  type="text"
                  placeholder="name"
                  {...register(
                    `carts.${index}.name` as `carts.${number}.${string}`,
                    {
                      required: true,
                    }
                  )}
                  className={`mt-10 block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors?.carts?.[index]?.name ? "error" : ""
                  }`}
                />
                <input
                  placeholder="quantity"
                  type="number"
                  {...register(
                    `carts.${index}.quantity` as `carts.${number}.${string}`,
                    {
                      valueAsNumber: true,
                      required: true,
                    }
                  )}
                  className={`mt-10 block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors?.carts?.[index]?.quantity ? "error" : ""
                  }`}
                />
                <input
                  placeholder="value"
                  type="number"
                  {...register(
                    `carts.${index}.price` as `carts.${number}.${string}`,
                    {
                      valueAsNumber: true,
                      required: true,
                    }
                  )}
                  className={`mt-10 block
                  w-full
                  rounded-md
                  border-gray-300s
                  shadow-sm
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                    errors?.carts?.[index]?.price ? "error" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn-red"
                >
                  DELETE
                </button>
              </section>
            </div>
          );
        })}
        <input type="submit" className="me-2" />
        <button
          type="button"
          className="btn-blue"
          onClick={() =>
            append({
              name: "",
              quantity: "",
              price: "",
            })
          }
        >
          APPEND
        </button>
      </form>
    </div>
  );
}
