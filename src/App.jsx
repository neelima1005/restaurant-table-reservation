import { useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {

  const [formData,setFormData] = useState({
    customer_name:"",
    email:"",
    phone:"",
    reservation_date:"",
    reservation_time:"",
    guests:"",
    table_number:"",
    status:"Confirmed"
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const { error } = await supabase
      .from("reservations")
      .insert([formData]);

    if(error){
      alert(error.message);
    }else{
      alert("Reservation Confirmed!");
      setFormData({
        customer_name:"",
        email:"",
        phone:"",
        reservation_date:"",
        reservation_time:"",
        guests:"",
        table_number:"",
        status:"Confirmed"
      });
    }
  };

  return (
    <div className="container">

      <h1>🍽 Restaurant Table Reservation</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="reservation_date"
          value={formData.reservation_date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="reservation_time"
          value={formData.reservation_time}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="guests"
          placeholder="Guests"
          value={formData.guests}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="table_number"
          placeholder="Table Number"
          value={formData.table_number}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Reserve Table
        </button>

      </form>

    </div>
  );
}

export default App;