import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";

type FormValues = {
  name: string;
  price: number;
  quantity: number;
}[];
type AllFormValues = {
  cusName: string;
  age: number;
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
      age: 18,
      desc: "test",
      carts: [{ name: "test", quantity: 1, price: 23 }],
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
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div className="shrink-0">
          <img className="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-slate-500">You have a new message!</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder=""
            {...register("cusName", {
              required: true,
            })}
            className={errors?.cusName ? "error" : ""}
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
            {...register("desc", {
              required: true,
            })}
            placeholder="description"
          ></textarea>
        </div>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...register(`carts.${index}.name` as const, {
                    required: true,
                  })}
                  className={errors?.carts?.[index]?.name ? "error" : ""}
                />
                <input
                  placeholder="quantity"
                  type="number"
                  {...register(`carts.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.carts?.[index]?.quantity ? "error" : ""}
                />
                <input
                  placeholder="value"
                  type="number"
                  {...register(`carts.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true,
                  })}
                  className={errors?.carts?.[index]?.price ? "error" : ""}
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

        <button
          type="button"
          className="btn-blue"
          onClick={() =>
            append({
              name: "",
              quantity: 0,
              price: 0,
            })
          }
        >
          APPEND
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
