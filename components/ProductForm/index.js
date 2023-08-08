import { StyledForm, StyledHeading, StyledLabel } from "./ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";

export default function ProductForm({ onSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledHeading>Add a new Fish</StyledHeading>
      <StyledLabel htmlFor="name">
        Name:
        <input type="text" id="name" name="name" />
      </StyledLabel>
      <StyledLabel htmlFor="description">
        Description:
        <input type="text" id="description" name="description" />
      </StyledLabel>
      <StyledLabel htmlFor="price">
        Price:
        <input type="number" id="price" name="price" min="0" />
      </StyledLabel>
      <StyledLabel htmlFor="currency">
        Currency:
        <select id="currency" name="currency">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </StyledLabel>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}

/* 
Switch to `./components/ProductForm/index.js`.

Lift up all logic regarding the creating of the `productData` to the `./pages/index.js` file.

> 💡 This includes the destructuring of `const { mutate } = useSWR("/api/products");`, the `handleSubmit` function and the import of `useSWR`.

After doing so,

- rename the `handleSubmit` function to `handleAddProduct`
- in the return statement, pass `handleAddProduct` to the `ProductForm` component as a prop called `onSubmit`.

Switch back to `./components/ProductForm/index.js` and

- receive the `onSubmit` prop.
- use `onSubmit` instead of `handleSubmit` in the form

> 💡 Bonus: Pass another new prop to the `ProductForm` component to set the heading of the form dynamically ("Add a new Fish" is not a proper headline when updating the product, right?).
 */
