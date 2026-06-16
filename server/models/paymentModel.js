import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["UPI", "Card", "Cash"],
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending",
  },

  transactionId: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Payment", paymentSchema);