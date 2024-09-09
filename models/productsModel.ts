import { model, Schema } from "mongoose";
import { Products } from "../interfaces/productsInterface";

const productsSchema: Schema = new Schema<Products>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 1, max: 100000 },
    priceAfterDiscount: { type: Number, min: 1, max: 100000 },
    ratingAverage: Number,
    ratingCount: Number,
    quantity: { type: Number, min: 0, default: 0 },
    sold: { type: Number, default: 0 },
    cover: String,
    images: [String],
    category: { type: Schema.Types.ObjectId, ref: "categories" },
    subCategory: { type: Schema.Types.ObjectId, ref: "subCategories" },
  },
  { timestamps: true }
);

productsSchema.pre<Products>(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  this.populate({ path: "subCategory", select: "name" });
  next();
});

export default model<Products>("products", productsSchema);
