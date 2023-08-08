import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import Comments from "../Comments";
import ProductForm from "../ProductForm";
import { useState } from "react";

export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);

  async function handleEditProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      console.error(`Error: ${response.status}`);
      mutate();
    }
  }

  async function handleDeleteProduct() {
    const answer = window.confirm(
      "Are you sure, Do you want to delete the Fish"
    );
    if (answer) {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/");
      }
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <div>
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        >
          <span role="img" aria-label="A pencil">
            ✏️
          </span>
        </button>
        <button onClick={handleDeleteProduct} disabled={isEditMode}>
          <span role="img" aria-label="A cross indicating deletion">
            ❌
          </span>
        </button>
        {isEditMode && (
          <ProductForm
            onSubmit={handleEditProduct}
            value={data.joke}
            isEditMode={true}
          />
        )}
      </div>
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}

/* Switch to `components/Product/index.js.js`.

You will need the `mutate` method to revalidate the product data after a successful update:

- destructure mutate from the object received from the `useSWR` hook.

Below this code, create a `handleEditProduct()` function:

- it receives `event` as parameter,
- it stores the submitted data in a variable called `productData` (Hint: `new FormData` and `Object.fromEntries` as already used)
- it starts a "PUT" request with `fetch` (hint: this fetch is similar to the "POST" fetch we perform to create products)
- uses `mutate` after a successful fetch to update the product detail page.

We need to update the content of our Product component to display the edit form:

- Create a state called `isEditMode` and initialize it with `false`.
- In the return statement, add a `<button>` with
  - `type="button"`,
  - `onClick={() => { setIsEditMode(!isEditMode); }}`,
  - and a proper text.
- In the return statement, display the `ProductForm` component depending on the `isEditMode` state (Hint: `isEditMode && ...`).
- pass our `handleEditProduct` function to the `ProductForm` as the `onSubmit` prop.

Open [`localhost:3000/`](http://localhost:3000/) in your browser, switch to a details page, edit a fish and be happy about your shop being expanded! 

Deleting a product should be possible from the details page.

Switch to `./components/Product/index.js` and implement a delete button:

- In the return statement, add a `<button>` with
  - `type="button"`,
  - `onClick={() => handleDeleteProduct(id)}`,
  - and a proper text.

Write the `handleDeleteProduct` function:

- _Wait_ for a `fetch()` with two arguments:
  - the url `/api/products/${id}` and
  - an options object `{ method: "DELETE" }`
- Save the result in a variable called `response`.
- If the `response` is `ok`,
  - _wait_ for `response.json()` and use `push("/")`.
- If the `response` is not `ok`, log the `response.status` as an error to the console.

Open [`localhost:3000/`](http://localhost:3000/) in your browser, switch to a details page, delete a fish and be happy about your shop being expanded!


*/
