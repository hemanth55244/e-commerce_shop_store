import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductController } from "../../controllers/useProductController";
import Button from "../components/Button";

function AddProductPage() {
  const { addProduct, loading, error } = useProductController({
    autoLoad: false,
  });
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "General",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (image) {
      formData.append("image", image);
    }

    const result = await addProduct(formData);
    if (result) {
      toast.success("✅ Product added successfully!");
      setTimeout(() => navigate("/products"), 1500);
    } else if (error) {
      toast.error(`Failed to add product: ${error}`);
    }
  };

  return (
    <div className="centered-page">
      <div className="form-card" style={{ maxWidth: "560px" }}>
        <span className="eyebrow">Product Management</span>
        <h1 className="heading-xl" style={{ marginTop: "8px" }}>
          Add a new product
        </h1>
        <p className="caption text-muted" style={{ margin: "8px 0 24px" }}>
          Fill in the details below to add a product to your store.
        </p>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="input-field"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              className="input-field"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              className="input-field"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Accessories">Accessories</option>
              <option value="Sports & Fitness">Sports & Fitness</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="input-field textarea-field"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="input-field"
              onChange={handleImageChange}
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
