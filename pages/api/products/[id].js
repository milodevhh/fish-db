import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
  } else if (request.method === "PUT") {
    const updatedProduct = request.body;
    await Product.findByIdAndUpdate(id, updatedProduct);

    response.status(200).json({
      status: "Product successfully updated, you can see now the new Content",
    });
  } else if (request.method === "DELETE") {
    await Product.findByIdAndDelete(id);

    response
      .status(200)
      .json({ message: "Product successfully deleted, you cool guy" });
  }
}

/* Switch to [`pages/api/products/[id].js`](./pages/api/products/[id].js) and write the code for the `request.method` `PUT` :

- Get the updated product from the request body: `const updatedProduct = request.body;`
- _Wait_ for `Product.findByIdAndUpdate(id, updatedProduct)`.
- Respond with a status `200` and the message `{ status: "Product successfully updated." }`.

Switch to [`pages/api/products/[id].js`](./pages/api/products/[id].js) and write the code for the `request.method` `DELETE` :

- _Wait_ for `Product.findByIdAndDelete(id)`.
- Respond with a status `200` and the message `{ status: "Product successfully deleted." }`.



*/
